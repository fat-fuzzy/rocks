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
	[key: string]: {
		aggDataLifecycle: IAggregateDataLifecycle
		aggDocs: IAggregateDocs
		aggPresets: IAggregatePresets
		aggMetadata: IAggregateMetadata
	}
}): {
	[key: string]: {
		coordDocs: ICoordinateDocs
		coordExports: ICoordinateExports
		coordImports: ICoordinateImports
		coordMetadata: ICoordinateMetadata
		coordPresets: ICoordinatePresets
	}
} {
	const roots = Object.keys(options)

	const result: {
		[key: string]: {
			coordDocs: ICoordinateDocs
			coordExports: ICoordinateExports
			coordImports: ICoordinateImports
			coordMetadata: ICoordinateMetadata
			coordPresets: ICoordinatePresets
		}
	} = {}

	for (const root of roots) {
		const {aggDataLifecycle, aggMetadata, aggDocs, aggPresets} = options[root]

		const coordExports = new CoordinateExports(aggDataLifecycle)
		const coordImports = new CoordinateImports(aggDataLifecycle, aggDocs)
		const coordDocs = new CoordinateDocs(aggMetadata, aggDocs)
		const coordMetadata = new CoordinateMetadata(aggMetadata, aggDocs)
		const coordPresets = new CoordinatePresets(aggMetadata, aggPresets)

		result[root] = {
			coordDocs,
			coordExports,
			coordImports,
			coordMetadata,
			coordPresets,
		}
	}

	return result
}
