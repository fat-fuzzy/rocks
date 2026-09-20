/**
 * Transformation Pipeline
 * - Keep serialization logic out of components and storage code.
 * - Each function must be individually unit-testable.
 */

import type {
	DocLanguage,
	DocMeta,
	DocPath,
	Section,
	Block,
	Preset,
	OPFSTreeDoc,
	OPFSTreePreset,
	SeedDoc,
	PendingRequest,
	ResponsePayload,
	WorkerMessage,
	WorkerResponse,
	FrontmatterBase,
	SeedType,
	Slug,
	Rank,
	FrontmatterStructure,
	OPFSTreeBase,
	OPFSTreeStructure,
	NamespaceId,
} from '$types'

const REQUEST_TIMEOUT_MS = 100000

export default class WorkerBridge {
	private worker: Worker
	private pending: Map<string, PendingRequest> = new Map()

	constructor(worker: Worker) {
		this.worker = worker
		this.worker.onmessage = this.handleResponse.bind(this)
		this.worker.onerror = this.handleError.bind(this)
	}

	/********************************
	 ******* Core send/receive ******
	 ********************************/

	private send(message: WorkerMessage): Promise<unknown> {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				this.pending.delete(message.requestId)
				reject(new Error(`Worker request timed out: ${message.type}`))
			}, REQUEST_TIMEOUT_MS)

			this.pending.set(message.requestId, {resolve, reject, timeout})
			this.worker.postMessage(message)
		})
	}

	private handleResponse(event: MessageEvent<WorkerResponse>): void {
		const {requestId, ok} = event.data
		const pending = this.pending.get(requestId)
		if (!pending) return

		clearTimeout(pending.timeout)
		this.pending.delete(requestId)

		if (ok) {
			pending.resolve(event.data.body as ResponsePayload)
		} else {
			pending.reject(new Error(event.data.error))
		}
	}

	private handleError(event: ErrorEvent) {
		// reject all pending on worker crash
		for (const [id, pending] of this.pending) {
			clearTimeout(pending.timeout)
			pending.reject(`Worker error: ${event.message}`)
			this.pending.delete(id)
		}
	}

	/********************************
	 ********** Public API **********
	 ********************************/

	checkSeed(root: NamespaceId, type: SeedType) {
		return this.send({
			type: 'CHECK_SEED',
			requestId: crypto.randomUUID(),
			payload: {root, type},
		})
	}

	seedDocs(payload: {root: NamespaceId; seed: SeedDoc[]}) {
		return this.send({
			type: 'SEED_ROOT',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	seedBase(payload: {root: NamespaceId; base: FrontmatterBase}) {
		return this.send({
			type: 'SEED_BASE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveBase(payload: {root: NamespaceId; base: FrontmatterBase}) {
		return this.send({
			type: 'SAVE_BASE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	seedStructure(payload: {
		root: NamespaceId
		structures: FrontmatterStructure[]
	}) {
		return this.send({
			type: 'SEED_STRUCTURE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveStructures(payload: {
		root: NamespaceId
		structures: FrontmatterStructure[]
	}) {
		return this.send({
			type: 'SAVE_STRUCTURES',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getDocBase(payload: {root: NamespaceId}) {
		return this.send({
			type: 'GET_DOC_BASE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getDocStructure(payload: {root: NamespaceId}) {
		return this.send({
			type: 'GET_DOC_STRUCTURE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	restoreFromBackup(payload: {
		root: NamespaceId
		content: OPFSTreeDoc
		presets: OPFSTreePreset
		base: OPFSTreeBase
		structure: OPFSTreeStructure
	}) {
		return this.send({
			type: 'RESTORE_FROM_BACKUP',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveLanguage(payload: {
		root: NamespaceId
		language: DocLanguage
		sourceLanguage: DocLanguage
		formats: Slug[]
	}) {
		return this.send({
			type: 'ADD_LANGUAGE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveFormat(payload: {
		root: NamespaceId
		format: Slug
		sourceFormat: Slug
		languages: DocLanguage[]
		formats: Slug[]
	}) {
		return this.send({
			type: 'ADD_FORMAT',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getProse(payload: {root: NamespaceId; path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'GET_DOC_CONTENT',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getAllDocs(payload: {root: NamespaceId}) {
		return this.send({
			type: 'GET_ALL_DOCS',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveBlock(payload: {
		root: NamespaceId
		language: DocLanguage
		format: Slug
		block: Block
		path: DocPath
	}) {
		return this.send({
			type: 'SAVE_BLOCK',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	createSection(payload: {
		root: NamespaceId
		name: Slug
		title?: string
		rank: Rank
		formats: Slug[]
		language: DocLanguage
		updateRanks: Section[]
	}) {
		return this.send({
			type: 'CREATE_SECTION',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveSection(payload: {
		root: NamespaceId
		language: DocLanguage
		format: Slug
		section: Section
	}) {
		return this.send({
			type: 'SAVE_SECTION',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	deleteDoc(payload: {root: NamespaceId; path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'DELETE_DOC',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	savePreset(payload: {
		root: NamespaceId
		path: DocPath
		meta: DocMeta
		preset: Preset
	}) {
		return this.send({
			type: 'SAVE_PRESET',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	deletePreset(payload: {root: NamespaceId; path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'DELETE_PRESET',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getPreset(payload: {root: NamespaceId; path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'GET_PRESET',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getAllPresets(payload: {root: NamespaceId}) {
		return this.send({
			type: 'GET_ALL_PRESETS',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	deleteAll(payload: {root: NamespaceId}) {
		return this.send({
			type: 'DELETE_ALL',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	// exportAll(language: string, format: string) {
	// 	return this.send({
	// 		type: 'EXPORT_ALL',
	// 		requestId: crypto.randomUUID(),
	// 		payload: {language, format},
	// 	})
	// }

	destroy() {
		if (this.worker) {
			this.worker.terminate()
		}
	}
}
