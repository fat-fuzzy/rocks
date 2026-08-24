import type {
	IAggregateDocs,
	IAggregateMetadata,
	IAggregateDataLifecycle,
	IAggregatePresets,
	ICoordinateDocs,
	ICoordinateExports,
	ICoordinateMetadata,
	ICoordinateImports,
	ICoordinatePresets,
} from '$types'
import CoordinateDocs from '$lib/application/CoordinateDocs.svelte'
import CoordinateExports from '$lib/application/CoordinateExports.svelte'
import CoordinateImports from '$lib/application/CoordinateImports.svelte'
import CoordinateMetadata from '$lib/application/CoordinateMetadata.svelte'
import CoordinatePresets from '$lib/application/CoordinatePresets.svelte'

export function createCoords(options: {
	aggDataLifecycle: IAggregateDataLifecycle
	aggMetadata: IAggregateMetadata
	aggDocs: IAggregateDocs
	aggPresets: IAggregatePresets
}): {
	coordDocs: ICoordinateDocs
	coordExports: ICoordinateExports
	coordImports: ICoordinateImports
	coordMetadata: ICoordinateMetadata
	coordPresets: ICoordinatePresets
} {
	const {aggDataLifecycle, aggMetadata, aggDocs, aggPresets} = options

	const coordExports = new CoordinateExports(aggDataLifecycle)
	const coordImports = new CoordinateImports(aggDataLifecycle, aggDocs)
	const coordDocs = new CoordinateDocs(aggMetadata, aggDocs)
	const coordMetadata = new CoordinateMetadata(aggMetadata, aggDocs)
	const coordPresets = new CoordinatePresets(aggPresets)

	return {
		coordDocs,
		coordExports,
		coordImports,
		coordMetadata,
		coordPresets,
	}
}
