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
import {STATUS_LABEL, STATUS_FEEDBACK} from '$lib/intl/l10n'

/**
 * CoordinateImports class to manage data transfer operations into storage
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateImports implements ICoordinateImports {
	aggDataLifecycle: IAggregateDataLifecycle
	aggDocs: IAggregateDocs
	seeded:
		| {
				docs: {
					seeded: number
				}
				base: {
					seeded: number
				}
				structure: {
					seeded: number
				}
		  }
		| undefined = $state()
	withBackup = $state(true)
	status: ImportStatus = $state('idle')
	loading = $derived(this.status !== 'idle' && this.status !== 'ready')
	error = $derived(this.status === 'error')
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
		this.import = ''
		this.status = 'idle'
	}

	setStatus(status: ImportStatus) {
		this.status = status
	}

	setDeleteStrategy(withBackup: boolean) {
		this.withBackup = withBackup
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
		this.loading = true

		try {
			this.status = 'seeding'

			const seeded = await this.aggDataLifecycle.initSeed(frontmatter, seed)

			if (seeded) {
				this.seeded = seeded
			}

			this.status = 'done'
		} catch {
			this.status = 'error'
		} finally {
			this.loading = false
		}
	}

	async restoreFromBackup(jsonString: string) {
		this.loading = true

		try {
			this.status = 'importing'

			await this.aggDataLifecycle.importFromJson(jsonString)

			this.status = 'done'
		} catch {
			this.status = 'error'
		} finally {
			this.loading = false
		}
	}

	/**
	 * Delete all content and presets from OPFS storage
	 * @returns void
	 */
	async deleteAllContent(): Promise<void> {
		this.loading = true

		if (this.withBackup) {
			this.status = 'backing-up'
			// 1. Back up current content to filesystem
			const data = await this.aggDataLifecycle.buildJsonForExport()
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
