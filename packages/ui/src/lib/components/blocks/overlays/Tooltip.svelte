<script lang="ts">
	import type {TooltipProps} from '$types'

	let {id, label = 'Tooltip', place, children}: TooltipProps = $props()

	// Container styles
	let placeClass = $derived(place ? place : '')
</script>

<ff-tooltip {id} role="tooltip" class={placeClass}>
	<p>{label}</p>
	{#if children}
		{@render children()}
	{/if}
</ff-tooltip>
