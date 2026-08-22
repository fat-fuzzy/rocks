import type {
	IAggregateDocs,
	IAggregateMetadata,
	ICoordinateDocs,
	ICoordinateExports,
} from '$types'
import CoordinateDocs from '$lib/application/CoordinateDocs.svelte'
import CoordinateExports from '$lib/application/CoordinateExports'

export function createCoords(
	aggMetadata: IAggregateMetadata,
	aggDocs: IAggregateDocs,
): {
	coordDocs: ICoordinateDocs
	coordExports: ICoordinateExports
} {
	const coordExports = new CoordinateExports()
	const coordDocs = new CoordinateDocs(aggMetadata, aggDocs)

	return {
		coordDocs,
		coordExports,
	}
}
