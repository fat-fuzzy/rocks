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

export function createAggregates(roots: string[]): {
	[key: string]: {
		aggDataLifecycle: IAggregateDataLifecycle
		aggDocs: IAggregateDocs
		aggPresets: IAggregatePresets
		aggMetadata: IAggregateMetadata
	}
} {
	const result: {
		[key: string]: {
			aggDataLifecycle: IAggregateDataLifecycle
			aggDocs: IAggregateDocs
			aggPresets: IAggregatePresets
			aggMetadata: IAggregateMetadata
		}
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

	return result
}
