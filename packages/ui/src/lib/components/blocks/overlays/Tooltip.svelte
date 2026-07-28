<script lang="ts">
	import type {TooltipProps} from '$types'

	let {id, label = 'Tooltip', coords, children}: TooltipProps = $props()

	// Container styles
	let coordsClass = $derived(coords ? coords : '')
</script>

<ff-tooltip {id} role="tooltip" class={coordsClass}>
	<p>{label}</p>
	{#if children}
		{@render children()}
	{/if}
</ff-tooltip>
