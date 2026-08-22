import type {
	SeedDoc,
	FrontmatterSeed,
	FrontmatterStructure,
	ICoordinateImports,
	IAggregateDataLifecycle,
	ImportStatus,
	IAggregateDocs,
} from '$types'
import type {UiStatus} from '@fat-fuzzy/ui'

import {guardedExport} from '$lib/common/download'

const STATUS_LABEL: Record<ImportStatus, string> = {
	idle: 'First, choose your delete strategy',
	deleting: 'Deleting storage...',
	ready: 'Ready to import',
	'backing-up': 'Backing up...',
	importing: 'Importing...',
	done: 'Imported!',
	error: 'Error',
}

const STATUS_FEEDBACK: Record<ImportStatus, UiStatus | undefined> = {
	idle: undefined,
	deleting: undefined,
	ready: undefined,
	'backing-up': undefined,
	importing: undefined,
	done: 'success',
	error: 'error',
}

/**
 * CoordinateImports class to manage data transfer operations into storage
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateImports implements ICoordinateImports {
	aggDataLifecycle: IAggregateDataLifecycle
	aggDocs: IAggregateDocs
	loading = $state(false)
	error = $state(false)
	status: ImportStatus = $state('idle')
	statusLabel: string = $derived(STATUS_LABEL[this.status])
	statusFeedback: UiStatus | undefined = $derived(STATUS_FEEDBACK[this.status])
	import = $state('')

	constructor(
		aggDataLifecycle: IAggregateDataLifecycle,
		aggDocs: IAggregateDocs,
	) {
		this.loading = true
		this.aggDataLifecycle = aggDataLifecycle
		this.aggDocs = aggDocs
	}

	async init(
		frontmatter: FrontmatterSeed,
		seed?: {content: SeedDoc[]; structures: FrontmatterStructure[]},
	) {
		try {
			this.loading = true
			await this.aggDataLifecycle.init(frontmatter, seed)
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.loading = false
		this.error = false
		this.import = ''
		this.status = 'idle'
	}

	setStatus(status: ImportStatus) {
		this.status = status
	}

	/**
	 * Retrieve seed-flag if any
	 * @param meta metadata to retrieve file
	 * @returns a Promise that will update when the worker message arrives
	 */
	async checkSeed() {
		return this.aggDataLifecycle.checkSeed()
	}

	/**
	 * Initialize OPFS storage from seed markdown data
	 * @param seed: parsed markdown data as JSON
	 * @returns a Promise that will update when the worker message arrives
	 */
	async initSeed(frontmatter: FrontmatterSeed, seed: SeedDoc[]) {
		return this.aggDataLifecycle.initSeed(frontmatter, seed)
	}

	async importFromJSON(jsonString: string) {
		this.loading = true

		try {
			this.status = 'importing'

			await this.aggDataLifecycle.importFromJSON(jsonString)

			this.status = 'done'
		} catch {
			this.status = 'error'
			this.error = true
		} finally {
			this.loading = false
		}
	}

	/**
	 * Delete all content and presets from OPFS storage
	 * @returns void
	 */
	async deleteAllContent(withBackup: boolean): Promise<void> {
		this.loading = true

		if (withBackup) {
			this.status = 'backing-up'
			// 1. Back up current content to filesystem
			const data = await this.aggDataLifecycle.buildFullJSON()
			await guardedExport({data})
		}

		// 2. Delete existing storage: the import replaces OPFS content
		this.status = 'deleting'

		await this.aggDataLifecycle.deleteAllContent()
		await this.aggDocs.loadDocStore()

		this.status = 'ready'

		this.loading = false
	}
}
