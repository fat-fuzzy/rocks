<script lang="ts">
	import {clickOutside} from '$lib/utils/click-outside.js'
	import type {RevealLayoutProps} from './layout.types.js'
	import styleHelper from '$lib/utils/styles.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/expand.types.js'

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
		layer,
		asset,
		children,
	}: RevealLayoutProps = $props()

	let expanded = $state('collapsed')

	function handleClickOutside(event) {
		expanded = 'collapsed'
	}

	function toggleReveal(event) {
		expanded = event.state
	}

	let layoutClasses = $derived(styleHelper.getLayoutStyles({
			color,
			size,
			height,
			align,
			asset,
			variant,
			layout,
			background,
			layer
		}))

	let revealClasses = $derived(`l:reveal form:${expanded} ${layoutClasses} ${direction} ${expanded}`)

	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined
</script>

<form {method} {action}
	class={revealClasses}
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
		{asset}
		text= 'Reveal'
		onclick={toggleReveal}
		states={EXPAND_MACHINE}
	>
		{title}
	</Expand>
	<div id={`${id}-reveal`} class="content">
		{#if children}
			{@render children()}
		{/if}
	</div>
</form>
