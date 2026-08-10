import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	PresetStore,
	PresetIndex,
	OPFSPresetTree,
	IPresetService,
} from '$types'

import WorkerBridge from '$lib/workers/worker-bridge'
import {getBridge} from '$lib/services/storage/bridge'

import {getPresetKey} from '$lib/common/format'

import {opfsPresetTreeToPresetStore} from '$lib/common/transform/opfs-to-document'

import {buildPresetIndex} from '$lib/common/transform/store-to-index'

/**
 * PresetService class to manage access to stored presets
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class PresetService implements IPresetService {
	bridge: WorkerBridge | undefined = $state()
	seeded: {date_seed?: string; source?: string} = $state({})
	loading = $state(false)
	error = $state(false)
	presets: PresetStore = $state({})
	presetIndex: PresetIndex = $derived(buildPresetIndex(this.presets))

	constructor() {
		this.loading = true
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
	 * Get preset by name
	 * @param name
	 */
	getPreset(name: string): Preset {
		return this.presetIndex.presets[getPresetKey(name)]
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
			path,
			meta,
			preset: toUpdate,
		})

		this.presets[options.preset.name] = toUpdate
		this.presetIndex.presets[getPresetKey(toUpdate.name)] = toUpdate
	}

	/**
	 * Delete preset
	 * @param meta metadata of preset to delete
	 */
	async deletePreset(options: {path: DocPath; meta: DocMeta}) {
		if (!this.bridge) {
			return
		}

		const raw = (await this.bridge.deletePreset(options)) as {deleted: boolean}

		if (raw.deleted) {
			delete this.presets[options.meta.name]
			delete this.presetIndex.presets[getPresetKey(options.meta.name)]
		}
	}

	/**
	 * Load all presets for nav display
	 */
	async getAllPresets() {
		if (!this.bridge) {
			return
		}

		const raw = (await this.bridge.getAllPresets()) as OPFSPresetTree
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
			path,
			meta,
			preset: toUpdate,
		})

		this.presets[options.preset.name] = toUpdate
		this.presetIndex.presets[getPresetKey(toUpdate.name)] = toUpdate
	}
}
