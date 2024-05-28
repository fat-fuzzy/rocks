<script lang="ts">
	import {clickOutside} from '$lib/utils/click-outside.js'
	import type {RevealLayoutProps} from './layout.types.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	let {
		id = 'reveal',
		title = 'Reveal',
		method = 'POST',
		formaction,
		actionPath,
		redirect,
		layout,
		direction = 'tb-lr',
		color,
		size,
		breakpoint,
		variant,
		align,
		height,
		background,
		asset,
		children,
	}: RevealLayoutProps = $props()

	let expanded = $state(false)

	function handleClickOutside(event) {
		expanded = false
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	let backgroundClass = background ? `layer bg:${background}` : 'hide:viz-only'
	let show = $derived(expanded ? `${backgroundClass} show` : 'hide:viz-only')
	let setHeight = height ? ` h:${height}` : ''

	// TODO: use a form
	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined
</script>

<form {method} {action}
	class={`l:reveal ${setHeight} l:${layout} bp:${breakpoint} ${size} ${direction}`}
	use:clickOutside
	onclickOutside={handleClickOutside}
>
	<Expand
		id={`button-reveal-${id}`}
		{title}
		{color}
		{variant}
		{size}
		type={actionPath && formaction ? 'submit' : 'button'}
		name="reveal"
		controls={`${id}-reveal`}
		value={'menu'}
		states={{
			expanded: {id: 'show', text: 'Reveal', value: 'show', asset},
			collapsed: {id: 'minimize', text: 'Reveal', value: 'minimize', asset},
		}}
		onclick={toggleReveal}
	>
		{title}
	</Expand>
	<div id={`${id}-reveal`} class={`align:${align} ${show}`}>
		{#if children}
			{@render children()}
		{/if}
	</div>
</form>
