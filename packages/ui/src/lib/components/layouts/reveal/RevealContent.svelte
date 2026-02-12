<script lang="ts">
	import {clickOutside} from '$lib/utils/browser/click-outside'
	import type {RevealLayoutProps} from '$types'

	let {
		id = 'RevealContent',
		reveal,
		area,
		scroll,
		layer,
		background,
		children,
		onclickoutside,
	}: RevealLayoutProps = $props()

	let expanded = $derived(reveal)
	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')
	let areaClass = $derived(area ? area : '')

	function handleClickOutside() {
		if (onclickoutside) {
			onclickoutside()
		}
	}
</script>

<ff-reveal
	use:clickOutside
	onclickoutside={handleClickOutside}
	{id}
	class={`${expanded} ${areaClass} ${scrollClass} ${layerClass} ${backgroundClass}`}
>
	{#if children}
		{@render children()}
	{/if}
</ff-reveal>
