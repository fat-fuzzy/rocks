<script lang="ts">
	import type {TooltipProps} from '$types'

	let {
		anchorId,
		label = 'Tooltip',
		coords,
		layer = '1',
		children,
	}: TooltipProps = $props()

	// Container styles
	let coordsClass = $derived(coords ? `anchored:${coords}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
</script>

<ff-tooltip
	id={`tooltip-${anchorId}`}
	role="tooltip"
	class={`${coordsClass} ${layerClass}`}
>
	<p>{label}</p>
	{#if children}
		{@render children()}
	{/if}
</ff-tooltip>
