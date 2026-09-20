import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	PresetStore,
	PresetIndex,
	OPFSTreePreset,
	IAggregatePresets,
	NamespaceId,
} from '$types'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/aggregates/bridge'

import {getPresetKey} from '$lib/common/format'

import {opfsPresetTreeToPresetStore} from '$lib/common/transform/opfs-to-doc'

import {buildPresetIndex} from '$lib/common/transform/store-to-index'

/**
 * AggregatePresets class to manage access to stored presets
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class AggregatePresets implements IAggregatePresets {
	root: NamespaceId
	bridge: WorkerBridge | undefined = $state()
	seeded: {date_seed?: string; source?: string} = $state({})
	loading = $state(false)
	error = $state(false)
	presets: PresetStore = $state({})
	presetIndex: PresetIndex = $derived(buildPresetIndex(this.presets))

	constructor(root: NamespaceId) {
		this.loading = true
		this.root = root
	}

	async init() {
		this.bridge = getBridge()
		try {
			this.loading = true

			await this.getAllPresets()
		} catch {
			this.error = true
		} finally {
			this.loading = false
		}
	}

	reset() {
		this.presets = {}
	}

	/**
	 * Return true if presets found
	 */
	hasPresets(): boolean {
		return Object.keys(this.presets).length > 0
	}

	/**
	 * Get a preset give a well formed index key
	 * @param name
	 */
	getPreset(key: string): Preset | void {
		return this.presetIndex.presets[key]
	}

	/**
	 * Save preset
	 * @param meta preset metadata to update (save or create)
	 * @param content { query: string } preset query
	 */
	async savePreset(options: {
		path: DocPath
		meta: DocMeta
		preset: {id?: Uuid; name: string; query: string}
	}) {
		if (!this.bridge) {
			return
		}

		const {path, meta, preset} = options

		const toUpdate: Preset = {...preset, id: preset.id ?? crypto.randomUUID()}

		await this.bridge.savePreset({
			root: this.root,
			path,
			meta,
			preset: toUpdate,
		})

		this.presets[options.preset.name] = toUpdate

		const key = getPresetKey(toUpdate.name)

		if (key) {
			this.presetIndex.presets[key] = toUpdate
		}
	}

	/**
	 * Delete preset
	 * @param meta metadata of preset to delete
	 */
	async deletePreset(options: {path: DocPath; meta: DocMeta}) {
		if (!this.bridge) {
			return
		}

		const raw = (await this.bridge.deletePreset({
			root: this.root,
			...options,
		})) as {deleted: boolean}

		if (raw.deleted) {
			delete this.presets[options.meta.name]
			const key = getPresetKey(options.meta.name)

			if (key) {
				delete this.presetIndex.presets[key]
			}
		}
	}

	/**
	 * Load all presets for nav display
	 */
	async getAllPresets() {
		if (!this.bridge) {
			return
		}

		const raw = (await this.bridge.getAllPresets({
			root: this.root,
		})) as OPFSTreePreset
		this.presets = opfsPresetTreeToPresetStore(raw)
	}

	/**
	 * Load all presets for nav display
	 */
	loadPresets(): Record<string, Preset> {
		return this.presetIndex.presets
	}

	/**
	 * Lock preset to prevent accidental editing / deleting
	 * @param meta preset metadata to update (save or create)
	 * @param content { query: string } preset query
	 */
	async togglePresetLock(options: {
		path: DocPath
		meta: DocMeta
		preset: {id?: Uuid; name: string; query: string}
	}) {
		if (!this.bridge) {
			return
		}

		const {path, meta, preset} = options

		const toUpdate: Preset = {...preset, id: preset.id ?? crypto.randomUUID()}

		toUpdate.locked = !toUpdate.locked

		await this.bridge.savePreset({
			root: this.root,
			path,
			meta,
			preset: toUpdate,
		})

		this.presets[options.preset.name] = toUpdate
		const key = getPresetKey(toUpdate.name)

		if (key) {
			this.presetIndex.presets[key] = toUpdate
		}
	}
}
