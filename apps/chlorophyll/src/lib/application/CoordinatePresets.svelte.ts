import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	ICoordinatePresets,
	IAggregatePresets,
} from '$types'

import {getPresetKey} from '$lib/common/format'

/**
 * CoordinatePresets class to manage access to stored presets
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinatePresets implements ICoordinatePresets {
	readonly aggPresets: IAggregatePresets
	loading = $state(false)
	error = $state(false)

	constructor(aggPresets: IAggregatePresets) {
		this.aggPresets = aggPresets
	}

	reset() {
		this.loading = false
		this.error = false
	}

	/**
	 * Return true if presets found
	 */
	hasPresets(): boolean {
		return Object.keys(this.aggPresets.presets).length > 0
	}

	/**
	 * Get preset by name
	 * @param name
	 */
	getPreset(name: string): Preset {
		return this.aggPresets.presetIndex.presets[getPresetKey(name)]
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
		return this.aggPresets.savePreset(options)
	}

	/**
	 * Delete preset
	 * @param meta metadata of preset to delete
	 */
	async deletePreset(options: {path: DocPath; meta: DocMeta}) {
		return this.aggPresets.deletePreset(options)
	}

	/**
	 * Load all presets for nav display
	 */
	async getAllPresets() {
		return this.aggPresets.getAllPresets()
	}

	/**
	 * Load all presets for nav display
	 */
	loadPresets(): Record<string, Preset> {
		return this.aggPresets.presetIndex.presets
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
		return this.aggPresets.togglePresetLock(options)
	}
}
