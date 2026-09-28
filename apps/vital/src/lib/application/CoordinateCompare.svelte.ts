import type {ICoordinateCompare, NamespaceId, Coordinators, Slug} from '$types'

import {SvelteURLSearchParams} from 'svelte/reactivity'

/**
 * CoordinateCompare class to manage access to stored presets
 * Maintains a cache of data in memory
 * Sends/receive messages via worker bridge
 */
export default class CoordinateCompare implements ICoordinateCompare {
	coords: {
		[key in NamespaceId]: Coordinators
	}
	loading = $state(false)
	error = $state(false)

	constructor(coords: {
		[key in NamespaceId]: Coordinators
	}) {
		this.coords = coords
	}

	reset() {
		this.loading = false
		this.error = false
	}

	getCoordDocs(namespace: NamespaceId) {
		return this.coords[namespace].coordDocs
	}

	getCoordPresets(namespace: NamespaceId) {
		return this.coords[namespace].coordPresets
	}

	getCompareQuery(options: {
		params: URLSearchParams
		role: 'source' | 'target'
		namespace: NamespaceId
		presetName?: Slug
	}) {
		const {params, role, namespace, presetName} = options

		const next = new SvelteURLSearchParams(params)

		for (const key of Array.from(next.keys())) {
			if (key.startsWith(`${role}_`)) next.delete(key)
		}
		next.set(`${role}_root`, namespace)

		if (presetName) {
			const coordPresets = this.coords[namespace].coordPresets
			const queryForRole =
				role === 'source'
					? coordPresets.getSourcePresetQuery(presetName)
					: coordPresets.getTargetPresetQuery(presetName)
			const roleParams = new SvelteURLSearchParams(queryForRole)

			for (const [key, value] of roleParams) {
				next.set(key, value)
			}
		}
		return `?${next}`
	}
}
