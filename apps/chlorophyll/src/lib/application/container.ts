import type {
	IAggregateDocs,
	IAggregateMetadata,
	ICoordinateDocs,
	ICoordinateExports,
	ICoordinateMetadata,
	ICoordinateImports,
	IAggregateDataLifecycle,
} from '$types'
import CoordinateDocs from '$lib/application/CoordinateDocs.svelte'
import CoordinateExports from '$lib/application/CoordinateExports.svelte'
import CoordinateImports from '$lib/application/CoordinateImports.svelte'
import CoordinateMetadata from '$lib/application/CoordinateMetadata.svelte'

export function createCoords(options: {
	aggDataLifecycle: IAggregateDataLifecycle
	aggMetadata: IAggregateMetadata
	aggDocs: IAggregateDocs
}): {
	coordDocs: ICoordinateDocs
	coordExports: ICoordinateExports
	coordImports: ICoordinateImports
	coordMetadata: ICoordinateMetadata
} {
	const {aggDataLifecycle, aggMetadata, aggDocs} = options

	const coordExports = new CoordinateExports(aggDataLifecycle)
	const coordImports = new CoordinateImports(aggDataLifecycle, aggDocs)
	const coordDocs = new CoordinateDocs(aggMetadata, aggDocs)
	const coordMetadata = new CoordinateMetadata(aggMetadata, aggDocs)

	return {
		coordDocs,
		coordExports,
		coordImports,
		coordMetadata,
	}
}
