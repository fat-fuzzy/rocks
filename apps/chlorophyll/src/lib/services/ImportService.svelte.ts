export * from '$lib/types/services/import'
import type {
	SeedDoc,
	FrontmatterSeed,
	FrontmatterStructure,
	IImportService,
} from '$types'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/services/bridge'

/**
 * ImportService class to manage data transfer operations into storage
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class ImportService implements IImportService {
	bridge: WorkerBridge | undefined = $state()
	seeded: {date_seed?: string; source?: string} = $state({})
	loading = $state(false)
	error = $state(false)
	export = $state({
		type: 'doc-root',
		meta: {},
		data: '',
	})
	import = $state('')

	constructor() {
		this.loading = true
	}

	async init(
		frontmatter: FrontmatterSeed,
		seed: {content: SeedDoc[]; structures: FrontmatterStructure[]},
	) {
		this.bridge = getBridge()
		try {
			this.loading = true
			const seeded = await this.checkSeed()

			if (!seeded && seed.content.length) {
				await this.initSeed(frontmatter, seed.content)
			}
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.seeded = {}
	}

	/**
	 * Retrieve seed-flag if any
	 * @param meta metadata to retrieve file
	 * @returns a Promise that will update when the worker message arrives
	 */
	async checkSeed() {
		if (!this.bridge) {
			return
		}

		// FIXME: this is fragile
		const base = (await this.bridge.checkSeed('base')) as {
			seeded: {date_seed?: string; source?: string}
		}

		const structure = (await this.bridge.checkSeed('structure')) as {
			seeded: {date_seed?: string; source?: string}
		}

		let content = (await this.bridge.checkSeed('root')) as {
			seeded: {date_seed?: string; source?: string}
		}

		if (!content.seeded) {
			content = (await this.bridge.checkSeed('backup')) as {
				seeded: {date_seed?: string; source?: string}
			}
		}

		if (!content.seeded) {
			return content.seeded
		}

		return base.seeded && structure.seeded
	}

	/**
	 * Initialize OPFS storage from seed markdown data
	 * @param seed: parsed markdown data as JSON
	 * @returns a Promise that will update when the worker message arrives
	 */
	async initSeed(frontmatter: FrontmatterSeed, seed: SeedDoc[]) {
		if (!this.bridge) {
			return
		}

		const docs = (await this.bridge.seedDocs({seed})) as {
			seeded: number
		}
		const base = (await this.bridge.seedBase({
			base: frontmatter.base,
		})) as {
			seeded: number
		}

		const structure = (await this.bridge.seedStructure({
			structures: frontmatter.structures,
		})) as {
			seeded: number
		}

		// FIXME: adjust and make use of this data or remove it
		return {docs, base, structure}
	}

	async importFromJSON(jsonString: string) {
		if (!this.bridge) {
			return
		}

		this.loading = true

		const {content, presets, base} = JSON.parse(jsonString)
		await this.bridge.restoreFromBackup({content, presets, base})

		this.loading = false
	}

	/**
	 * Delete all content and presets from OPFS storage
	 * @returns void
	 */
	async deleteAllContent(): Promise<void> {
		if (!this.bridge) {
			return
		}

		await this.bridge.deleteAll()
		this.reset()
	}
}
