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
	NamespaceId,
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
	root: NamespaceId
	loading = $state(false)
	bridge: WorkerBridge | undefined = $state()
	seeded: {date_seed?: string; source?: string} = $state({})
	export = $state({
		type: 'doc-root',
		meta: {},
		data: '',
	})
	import = $state('')

	constructor(root: NamespaceId) {
		this.loading = true
		this.root = root
	}

	async init(
		frontmatter: FrontmatterSeed,
		seed?: {content: SeedDoc[]; structures: FrontmatterStructure[]},
	) {
		this.loading = true
		this.bridge = getBridge()
		const seeded = await this.checkSeed()

		if (!seeded && seed?.content.length) {
			await this.initSeed(frontmatter, seed.content)
		} else {
			await this.initSeed(DEFAULT_STRUCTURES, DEFAULT_CONTENT)
		}

		this.loading = false
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
		const base = (await this.bridge.checkSeed(this.root, 'base')) as {
			seeded: {date_seed?: string; source?: string}
		}

		const structure = (await this.bridge.checkSeed(this.root, 'structure')) as {
			seeded: {date_seed?: string; source?: string}
		}

		const content = (await this.bridge.checkSeed(this.root, 'root')) as {
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
			root: this.root,
			base: frontmatter.base,
		})) as {
			seeded: number
		}

		const structure = (await this.bridge.seedStructure({
			root: this.root,
			structures: frontmatter.structures,
		})) as {
			seeded: number
		}

		const docs = (await this.bridge.seedDocs({
			root: this.root,
			seed,
		})) as {
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
			root: this.root,
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
			await this.bridge.deleteAll({
				root: this.root,
			})
			this.reset()
		} catch (error) {
			throw Error('Deleting content failed', {cause: error})
		}
	}

	async buildJsonForExport(): Promise<string> {
		// Load returns stringified data (worker message boundary)
		const [contentResult, presetsResult, baseResult, structureResult] =
			await Promise.all([
				getContentData(this.root),
				getPresetsData(this.root),
				getBaseData(this.root),
				getStructureData(this.root),
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
		const contentResult = await getContentData(this.root)
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
