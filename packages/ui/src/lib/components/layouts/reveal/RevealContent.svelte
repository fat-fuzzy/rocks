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
		children,
	}: RevealLayoutProps = $props()

	let expanded = $derived(reveal)
	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let areaClass = $derived(area ? area : '')
</script>

<ff-reveal
	id={`${id}-reveal`}
	class={`${expanded} ${areaClass} ${scrollClass} ${layerClass}`}
>
	{#if children}
		{@render children()}
	{/if}
</ff-reveal>
