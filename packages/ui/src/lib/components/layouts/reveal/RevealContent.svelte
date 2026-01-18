<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import constants from '$lib/types/constants.js'
	const {DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'RevealContent',
		reveal = DEFAULT_REVEAL_STATE.reveal,
		area,
		scroll,
		layer,
		background,
		children,
	}: RevealLayoutProps = $props()

	let expanded = $derived(reveal)
	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')
	let areaClass = $derived(area ? area : '')
</script>

<ff-reveal
	{id}
	class={`${expanded} ${areaClass} ${scrollClass} ${layerClass} ${backgroundClass}`}
>
	{#if children}
		{@render children()}
	{/if}
</ff-reveal>
