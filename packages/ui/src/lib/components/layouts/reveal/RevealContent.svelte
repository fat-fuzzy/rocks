<script lang="ts">
	import type {RevealContentProps} from '$types'

	let {
		id = 'RevealContent',
		area,
		scroll,
		layer,
		background,
		children,
	}: RevealContentProps = $props()

	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')
	let areaClass = $derived(area ? area : '')
	let revealClass = $derived(
		`${areaClass} ${scrollClass} ${layerClass} ${backgroundClass}`,
	)
</script>

<ff-reveal {id} class={revealClass}>
	{#if children}
		{@render children()}
	{/if}
</ff-reveal>
