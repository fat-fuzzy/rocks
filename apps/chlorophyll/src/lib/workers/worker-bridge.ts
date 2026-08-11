/**
 * Transformation Pipeline
 * - Keep serialization logic out of components and storage code.
 * - Each function must be individually unit-testable.
 */

import type {
	DocLanguage,
	DocFormat,
	DocMeta,
	DocPath,
	Section,
	Block,
	Preset,
	OPFSDocTree,
	OPFSPresetTree,
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
	OPFSBaseTree,
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

	checkSeed(type: SeedType) {
		return this.send({
			type: 'CHECK_SEED',
			requestId: crypto.randomUUID(),
			payload: {type},
		})
	}

	seedDocuments(payload: {seed: SeedDoc[]}) {
		return this.send({
			type: 'SEED_ROOT',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	seedBase(payload: {base: FrontmatterBase}) {
		return this.send({
			type: 'SEED_BASE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveBase(payload: {base: FrontmatterBase}) {
		return this.send({
			type: 'SAVE_BASE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	seedStructure(payload: {structures: FrontmatterStructure[]}) {
		return this.send({
			type: 'SEED_STRUCTURE',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getDocBase() {
		return this.send({
			type: 'GET_DOC_BASE',
			requestId: crypto.randomUUID(),
		})
	}

	getDocStructure() {
		return this.send({
			type: 'GET_DOC_STRUCTURE',
			requestId: crypto.randomUUID(),
		})
	}

	restoreFromBackup(payload: {
		content: OPFSDocTree
		presets: OPFSPresetTree
		base: OPFSBaseTree
	}) {
		return this.send({
			type: 'RESTORE_FROM_BACKUP',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getProse(payload: {path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'GET_DOC_CONTENT',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getAllDocs() {
		return this.send({
			type: 'GET_ALL_DOCS',
			requestId: crypto.randomUUID(),
		})
	}

	saveBlock(payload: {
		language: DocLanguage
		format: DocFormat
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
		name: Slug
		title?: string
		rank: Rank
		formats: DocFormat[]
		updateRanks: Section[]
	}) {
		return this.send({
			type: 'CREATE_SECTION',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	saveSection(payload: {
		language: DocLanguage
		format: DocFormat
		section: Section
	}) {
		return this.send({
			type: 'SAVE_SECTION',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	deleteDocument(payload: {path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'DELETE_DOC',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	savePreset(payload: {path: DocPath; meta: DocMeta; preset: Preset}) {
		return this.send({
			type: 'SAVE_PRESET',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	deletePreset(payload: {path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'DELETE_PRESET',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getPreset(payload: {path: DocPath; meta: DocMeta}) {
		return this.send({
			type: 'GET_PRESET',
			requestId: crypto.randomUUID(),
			payload,
		})
	}

	getAllPresets() {
		return this.send({
			type: 'GET_ALL_PRESETS',
			requestId: crypto.randomUUID(),
		})
	}

	deleteAll() {
		return this.send({
			type: 'DELETE_ALL',
			requestId: crypto.randomUUID(),
		})
	}

	exportAll(language: string, format: string) {
		return this.send({
			type: 'EXPORT_ALL',
			requestId: crypto.randomUUID(),
			payload: {language, format},
		})
	}

	destroy() {
		if (this.worker) {
			this.worker.terminate()
		}
	}
}
