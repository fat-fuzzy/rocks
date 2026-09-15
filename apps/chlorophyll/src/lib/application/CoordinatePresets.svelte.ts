import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	ICoordinatePresets,
	IAggregatePresets,
	IAggregateMetadata,
	TagGroup,
	Slug,
} from '$types'

import {getPresetKey} from '$lib/common/format'
import {SvelteURLSearchParams} from 'svelte/reactivity'

/**
 * CoordinatePresets class to manage access to stored presets
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinatePresets implements ICoordinatePresets {
	aggMetadata: IAggregateMetadata
	aggPresets: IAggregatePresets
	loading = $state(false)
	error = $state(false)
	sourcePreset: Preset | null = $state(null)
	targetPreset: Preset | null = $state(null)

	constructor(aggMetadata: IAggregateMetadata, aggPresets: IAggregatePresets) {
		this.aggMetadata = aggMetadata
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
	getPreset(name: string): Preset | void {
		try {
			const key = getPresetKey(name)
			return this.aggPresets.getPreset(key)
		} catch {
			return
		}
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
	setSourcePreset(name?: Slug): void {
		const preset = name ? this.getPreset(name) : null
		if (preset) {
			this.sourcePreset = preset
		} else {
			this.sourcePreset = null
		}
	}

	/**
	 * Set target preset to compare (edit)
	 * @param name
	 */
	setTargetPreset(name?: Slug): void {
		const preset = name ? this.getPreset(name) : null
		if (preset) {
			this.targetPreset = preset
		} else {
			this.targetPreset = null
		}
	}

	getPresetQuery(name: Slug): string {
		return this.removeRoleFromPresetQuery(name)
	}

	getPresetTags(name: string): string[] {
		const query = this.getPreset(name)?.query

		if (!query) {
			return []
		}

		const queryString = query.replace('?', '')
		const searchParams = new SvelteURLSearchParams(queryString)

		return this.aggMetadata.tagGroups.reduce(
			(selected: string[], menu: TagGroup) => {
				return selected.concat(searchParams.getAll(menu.name) || [])
			},
			[],
		)
	}

	removeRoleFromPresetQuery(name: Slug): string {
		const query = this.getPreset(name)?.query

		if (!query) {
			return ''
		}

		const queryString = query.replace('?', '')
		const searchParams = new SvelteURLSearchParams(queryString)
		let role = searchParams.get('source_preset')
		if (!role) {
			role = searchParams.get('target_preset')
		}

		if (!role) {
			return query
		}

		const complementary =
			role === 'source' ? 'target' : role === 'target' ? 'source' : ''

		if (!complementary) {
			return query
		}

		searchParams.delete(`${role}_preset`)
		searchParams.delete(`${complementary}_preset`)
		searchParams.delete(`${complementary}_sections`)
		searchParams.delete(`${complementary}_tags`)
		searchParams.delete(`${complementary}_language`)
		searchParams.delete(`${complementary}_format`)
		searchParams.append('preset', name)

		const language = searchParams.get(`${role}_language`) ?? ''
		const format = searchParams.get(`${role}_format`) ?? ''
		const sections = searchParams.get(`${role}_sections`) ?? ''

		if (language) {
			searchParams.append('language', language)
			searchParams.delete(`${role}_language`)
		}
		if (format) {
			searchParams.append('format', format)
			searchParams.delete(`${role}_format`)
		}
		if (sections) {
			sections.split(',').forEach((s) => {
				searchParams.append('sections', s)
			})
			searchParams.delete(`${role}_sections`)
		}
		const tags = this.getPresetTags(name)
		searchParams.delete(`${role}_tags`)

		const tagGroups = this.aggMetadata.tagGroups

		tags.forEach((tag) => {
			const tagGroup = tagGroups.find((tg) => tg.items.includes(tag))
			if (tagGroup) {
				searchParams.append(tagGroup.name, tag)
			}
		})

		return searchParams.toString()
	}

	getPresetQueryForRole(name: Slug, role: Slug): string {
		const query = this.getPresetQuery(name)

		if (!query) {
			return ''
		}

		const complementary =
			role === 'source' ? 'target' : role === 'target' ? 'source' : ''

		if (!complementary) {
			return ''
		}

		const queryString = query.replace('?', '')
		const searchParams = new SvelteURLSearchParams(queryString)

		if (searchParams.has(`${role}_preset`)) {
			return query
		}

		searchParams.delete('preset')
		searchParams.append(`${role}_preset`, name)

		const language = searchParams.get('language') ?? ''
		const format = searchParams.get('format') ?? ''
		const sections = searchParams.getAll('sections')
		const tags = this.getPresetTags(name)

		if (language) {
			searchParams.append(`${role}_language`, language)
		}
		if (format) {
			searchParams.append(`${role}_format`, format)
		}
		if (tags.length) {
			searchParams.append(`${role}_tags`, tags.join(','))
		}
		if (sections.length) {
			searchParams.append(`${role}_sections`, sections.join(','))
		}

		searchParams.delete('sections')
		searchParams.delete('language')
		searchParams.delete('format')
		searchParams.delete('version')

		const tagGroupNames = Object.keys(this.aggMetadata.tagGroups)

		searchParams.forEach((value, key) => {
			if (tagGroupNames.includes(key) && tags.includes(value)) {
				searchParams.delete(key)
			}
		})

		return searchParams.toString()
	}

	getSourcePresetQuery(name: string): string {
		return this.getPresetQueryForRole(name, 'source')
	}

	getTargetPresetQuery(name: string): string {
		return this.getPresetQueryForRole(name, 'target')
	}

	getCompareQuery(name: string, isSource: boolean, isTarget: boolean) {
		let targetQuery
		let sourceQuery

		if (isSource) {
			const targetPresetName = this.targetPreset?.name ?? ''
			targetQuery = this.getTargetPresetQuery(targetPresetName)

			sourceQuery = this.getSourcePresetQuery(name)
		}

		if (isTarget) {
			const sourcePresetName = this.sourcePreset?.name ?? ''
			sourceQuery = this.getSourcePresetQuery(sourcePresetName)
			targetQuery = this.getTargetPresetQuery(name)
		}

		const query =
			sourceQuery && targetQuery
				? `?${sourceQuery}&${targetQuery}`
				: sourceQuery
					? `?${sourceQuery}`
					: targetQuery
						? `?${targetQuery}`
						: ''

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

	getPresetByRole(presetRole: Slug, presetName?: string | null): Preset | null {
		let preset = null

		switch (presetRole) {
			case 'preset':
				if (presetName) {
					preset = this.getPreset(presetName) ?? null
				}
				break
			case 'source_preset':
				preset = this.getSourcePreset()
				break
			case 'target_preset':
				preset = this.getTargetPreset()
				break
			default:
				break
		}

		return preset
	}
}
