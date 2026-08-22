import type {
	IAggregateDataLifecycle,
	IAggregateDocs,
	IAggregatePresets,
	IAggregateMetadata,
} from '$types'
import AggregateDataLifecycle from '$lib/aggregates/AggregateDataLifecycle.svelte'
import AggregateDocs from '$lib/aggregates/AggregateDocs.svelte'
import AggregatePresets from '$lib/aggregates/AggregatePresets.svelte'
import AggregateMetadata from '$lib/aggregates/AggregateMetadata.svelte'

export function createAggregates(): {
	aggDataLifecycle: IAggregateDataLifecycle
	aggDocs: IAggregateDocs
	aggPresets: IAggregatePresets
	aggMetadata: IAggregateMetadata
} {
	const aggDataLifecycle = new AggregateDataLifecycle()
	const aggMetadata = new AggregateMetadata()
	const aggDocs = new AggregateDocs()
	const aggPresets = new AggregatePresets()

	return {
		aggDataLifecycle,
		aggDocs,
		aggPresets,
		aggMetadata,
	}
}
