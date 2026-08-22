import type {
	IAggregateImports,
	IAggregateDocs,
	IAggregatePresets,
	IAggregateMetadata,
} from '$types'
import AggregateImports from '$lib/aggregates/AggregateImports.svelte'
import AggregateDocs from '$lib/aggregates/AggregateDocs.svelte'
import AggregatePresets from '$lib/aggregates/AggregatePresets.svelte'
import AggregateMetadata from '$lib/aggregates/AggregateMetadata.svelte'

export function createAggregates(): {
	aggImports: IAggregateImports
	aggDocs: IAggregateDocs
	aggPresets: IAggregatePresets
	aggMetadata: IAggregateMetadata
} {
	const aggMetadata = new AggregateMetadata()
	const aggImports = new AggregateImports()
	const aggDocs = new AggregateDocs()
	const aggPresets = new AggregatePresets()

	return {
		aggImports,
		aggDocs,
		aggPresets,
		aggMetadata,
	}
}
