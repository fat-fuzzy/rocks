import type {
	IAggregateDocs,
	IAggregateMetadata,
	ICoordinateDocs,
	ICoordinateExports,
	ICoordinateMetadata,
} from '$types'
import CoordinateDocs from '$lib/application/CoordinateDocs.svelte'
import CoordinateExports from '$lib/application/CoordinateExports'
import CoordinateMetadata from '$lib/application/CoordinateMetadata.svelte'

export function createCoords(
	aggMetadata: IAggregateMetadata,
	aggDocs: IAggregateDocs,
): {
	coordDocs: ICoordinateDocs
	coordExports: ICoordinateExports
	coordMetadata: ICoordinateMetadata
} {
	const coordExports = new CoordinateExports()
	const coordDocs = new CoordinateDocs(aggMetadata, aggDocs)
	const coordMetadata = new CoordinateMetadata(aggMetadata, aggDocs)

	return {
		coordDocs,
		coordExports,
		coordMetadata,
	}
}
