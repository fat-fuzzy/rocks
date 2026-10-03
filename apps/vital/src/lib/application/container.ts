import type {Aggregators, Coordinators, NamespaceId} from '$types'
import CoordinateCompare from '#lib/application/CoordinateCompare.svelte.js'
import CoordinateDocs from '#lib/application/CoordinateDocs.svelte.js'
import CoordinateExports from '#lib/application/CoordinateExports.svelte.js'
import CoordinateImports from '#lib/application/CoordinateImports.svelte.js'
import CoordinateMetadata from '#lib/application/CoordinateMetadata.svelte.js'
import CoordinatePresets from '#lib/application/CoordinatePresets.svelte.js'

export function createCoords(options: {[key in NamespaceId]: Aggregators}): {
	[key in NamespaceId]: Coordinators
} {
	const roots = Object.keys(options)

	const result: {
		[key in NamespaceId]?: Coordinators
	} = {}

	for (const root of roots) {
		const {aggDataLifecycle, aggMetadata, aggDocs, aggPresets} =
			options[root as NamespaceId]

		const coordExports = new CoordinateExports(aggDataLifecycle)
		const coordImports = new CoordinateImports(aggDataLifecycle, aggDocs)
		const coordDocs = new CoordinateDocs(aggMetadata, aggDocs)
		const coordMetadata = new CoordinateMetadata(aggMetadata, aggDocs)
		const coordPresets = new CoordinatePresets(aggMetadata, aggPresets)

		result[root as NamespaceId] = {
			coordDocs,
			coordExports,
			coordImports,
			coordMetadata,
			coordPresets,
		}
	}

	return result as {
		[key in NamespaceId]: Coordinators
	}
}

export function createCompareCoords(coords: {
	[key in NamespaceId]: Coordinators
}) {
	return new CoordinateCompare(coords)
}
