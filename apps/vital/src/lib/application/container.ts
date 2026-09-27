import type {
	Aggregators,
	Coordinators,
	NamespaceId,
	PresetOptions,
} from '$types'
import CoordinateDocs from '$lib/application/CoordinateDocs.svelte'
import CoordinateExports from '$lib/application/CoordinateExports.svelte'
import CoordinateImports from '$lib/application/CoordinateImports.svelte'
import CoordinateMetadata from '$lib/application/CoordinateMetadata.svelte'
import CoordinatePresets from '$lib/application/CoordinatePresets.svelte'

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
	function setPreset(options: PresetOptions) {
		return coords[options.namespace].coordPresets.setSourcePreset(options.name)
	}

	function setSourceRoot(namespace: NamespaceId, sourceRoot: NamespaceId) {
		return coords[namespace].coordPresets.setSourceRoot(sourceRoot)
	}

	function getSourceRoot(namespace: NamespaceId) {
		return coords[namespace].coordPresets.getSourceRoot()
	}

	function getCoordPresets(namespace: NamespaceId) {
		return coords[namespace].coordPresets
	}

	function getCoordDocs(namespace: NamespaceId) {
		return coords[namespace].coordDocs
	}

	return {
		getCoordDocs,
		getCoordPresets,
		setPreset,
		setSourceRoot,
		getSourceRoot,
	}
}
