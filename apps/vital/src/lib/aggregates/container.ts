import type {NamespaceId, Aggregators} from '$types'
import AggregateDataLifecycle from '$lib/aggregates/AggregateDataLifecycle.svelte'
import AggregateDocs from '$lib/aggregates/AggregateDocs.svelte'
import AggregatePresets from '$lib/aggregates/AggregatePresets.svelte'
import AggregateMetadata from '$lib/aggregates/AggregateMetadata.svelte'

export function createAggregates(roots: NamespaceId[]): {
	[key in NamespaceId]: Aggregators
} {
	const result: {
		[key in NamespaceId]?: Aggregators
	} = {}

	for (const root of roots) {
		const aggDataLifecycle = new AggregateDataLifecycle(root)
		const aggMetadata = new AggregateMetadata(root)
		const aggDocs = new AggregateDocs(root)
		const aggPresets = new AggregatePresets(root)

		result[root] = {
			aggDataLifecycle,
			aggDocs,
			aggPresets,
			aggMetadata,
		}
	}

	return result as {
		[key in NamespaceId]: Aggregators
	}
}
