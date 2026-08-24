import {
	getContentData,
	getPresetsData,
	getBaseData,
	getStructureData,
} from '$lib/workers/storage/opfs'

import type {
	SeedDoc,
	FrontmatterSeed,
	FrontmatterStructure,
	IAggregateDataLifecycle,
} from '$types'

import {DEFAULT_STRUCTURES, DEFAULT_CONTENT} from '$data/doc/cv-config'
import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/aggregates/bridge'

/**
 * AggregateDataLifecycle class to manage data transfer operations into storage
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class AggregateDataLifecycle implements IAggregateDataLifecycle {
	bridge: WorkerBridge | undefined = $state()
	seeded: {date_seed?: string; source?: string} = $state({})
	export = $state({
		type: 'doc-root',
		meta: {},
		data: '',
	})
	import = $state('')

	constructor() {}

	async init(
		frontmatter: FrontmatterSeed,
		seed?: {content: SeedDoc[]; structures: FrontmatterStructure[]},
	) {
		this.bridge = getBridge()
		const seeded = await this.checkSeed()

		if (!seeded && seed?.content.length) {
			await this.initSeed(frontmatter, seed.content)
		} else {
			await this.initSeed(DEFAULT_STRUCTURES, DEFAULT_CONTENT)
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

		const content = (await this.bridge.checkSeed('root')) as {
			seeded: {date_seed?: string; source?: string}
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

		const docs = (await this.bridge.seedDocs({seed})) as {
			seeded: number
		}

		// FIXME: adjust and make use of this data or remove it
		return {docs, base, structure}
	}

	async importFromJson(jsonString: string) {
		if (!this.bridge) {
			return
		}

		const {content, presets, base, structure} = JSON.parse(jsonString)

		await this.bridge.restoreFromBackup({
			content,
			presets,
			base,
			structure,
		})
	}

	/**
	 * Delete all content and presets from OPFS storage
	 * @returns void
	 */
	async deleteAllContent(): Promise<void> {
		if (!this.bridge) {
			return
		}

		try {
			await this.bridge.deleteAll()
			this.reset()
		} catch (error) {
			throw Error('Deleting content failed', {cause: error})
		}
	}

	async buildJsonForExport(): Promise<string> {
		// Load returns stringified data (worker message boundary)
		const [contentResult, presetsResult, baseResult, structureResult] =
			await Promise.all([
				getContentData(),
				getPresetsData(),
				getBaseData(),
				getStructureData(),
			])

		// Parse to JSON here — at worker message boundary inwards
		// (we need objects to merge)
		const content = contentResult.data
		const presets = presetsResult.data
		const base = baseResult
		const structure = structureResult

		const exportData = {content, presets, base, structure}

		// Stringify here — at the download boundary outwards
		return JSON.stringify(exportData, null, 2)
	}

	// TODO Export markdowns
	async buildMarkdownForExport(): Promise<string> {
		const contentResult = await getContentData()
		// Parse to JSON here — at worker message boundary inwards
		// (we need objects to merge)
		const content = contentResult.data

		let html = ''

		Object.keys(content).forEach((key) => {
			html += content[key].html
		})

		return html
	}
}
