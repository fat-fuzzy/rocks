import type {
	IAggregateImports,
	IAggregateDocs,
	IAggregatePresets,
	IAggregateTags,
	IAggregateMetadata,
} from '$types'
import AggregateImports from '$lib/aggregates/AggregateImports.svelte'
import AggregateDocs from '$lib/aggregates/AggregateDocs.svelte'
import AggregateTags from '$lib/aggregates/AggregateTags.svelte'
import AggregatePresets from '$lib/aggregates/AggregatePresets.svelte'
import AggregateMetadata from '$lib/aggregates/AggregateMetadata.svelte'

export function createAggregates(): {
	aggImports: IAggregateImports
	aggDocs: IAggregateDocs
	aggTags: IAggregateTags
	aggPresets: IAggregatePresets
	aggMetadata: IAggregateMetadata
} {
	const aggMetadata = new AggregateMetadata()
	const aggImports = new AggregateImports()
	const aggDocs = new AggregateDocs()
	const aggPresets = new AggregatePresets()
	const aggTags = new AggregateTags(aggMetadata, aggDocs)

	return {
		aggImports,
		aggDocs,
		aggTags,
		aggPresets,
		aggMetadata,
	}
}
