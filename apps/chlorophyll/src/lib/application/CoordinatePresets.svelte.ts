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
	sourcePreset: Preset | null = $state(null)
	targetPreset: Preset | null = $state(null)

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
	 * @return Preset if found
	 */
	getPreset(name: string): Preset {
		return this.aggPresets.presetIndex.presets[getPresetKey(name)]
	}

	/**
	 * Get source preset to compare (readonly)
	 * @return Preset if found
	 */
	getSourcePreset(): Preset | null {
		return this.sourcePreset
	}

	/**
	 * Get target preset to compare (edit)
	 * @return Preset if found
	 */
	getTargetPreset(): Preset | null {
		return this.targetPreset
	}

	/**
	 * Set source preset to compare (readonly)
	 * @param name
	 */
	setSourcePreset(name?: string): void {
		if (name) {
			this.sourcePreset = this.getPreset(name)
		} else {
			this.sourcePreset = null
		}
	}

	/**
	 * Set target preset to compare (edit)
	 * @param name
	 */
	setTargetPreset(name?: string): void {
		if (name) {
			this.targetPreset = this.getPreset(name)
		} else {
			this.targetPreset = null
		}
	}

	getPresetQuery(name: string): string {
		const query = this.getPreset(name)?.query
		let cleanQuery = ''

		if (query) {
			cleanQuery = query.replaceAll('preset-source', 'preset')
			cleanQuery = cleanQuery.replaceAll('preset-target', 'preset')
		}
		return cleanQuery
	}

	getSourcePresetQuery(name: string): string {
		const query = this.getPreset(name)?.query
		return query && name
			? `${query}&preset-source=${name}`
			: `?preset-source=${name}`
	}

	getTargetPresetQuery(name: string): string {
		const query = this.getPreset(name)?.query
		return query && name
			? `${query}&preset-target=${name}`
			: `?preset-target=${name}`
	}

	// FLESH THIS OUT
	getCompareQuery(name: string, isSource: boolean, isTarget: boolean) {
		let query = this.getPresetQuery(name)

		if (isSource) {
			const targetPresetName = this.targetPreset?.name ?? ''
			const targetQuery = targetPresetName
				? this.getTargetPresetQuery(targetPresetName)
				: ''

			query = `${targetQuery}${this.getSourcePresetQuery(name)}`
		}

		if (isTarget) {
			const sourcePresetName = this.sourcePreset?.name ?? ''
			const sourceQuery = sourcePresetName
				? this.getSourcePresetQuery(sourcePresetName)
				: ''

			query = `${this.getTargetPresetQuery(name)}${sourceQuery}`
		}

		return query
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
