<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {clickOutside} from '$lib/utils/browser/click-outside'

	let {
		id = 'RevealContent',
		area,
		scroll,
		layer,
		background,
		children,
		onclickoutside,
	}: RevealLayoutProps = $props()

	let scrollClass = $derived(scroll ? `scroll:${scroll}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let backgroundClass = $derived(background ? `bg:${background}` : '')
	let areaClass = $derived(area ? area : '')
	let revealClass = $derived(
		`${areaClass} ${scrollClass} ${layerClass} ${backgroundClass}`,
	)

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
	class={revealClass}
>
	{#if children}
		{@render children()}
	{/if}
</ff-reveal>
