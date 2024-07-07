<script lang="ts">
	import {enhance} from '$app/forms'
	import type {RevealLayoutProps} from './layout.types.js'
	import constants from '$lib/types/constants.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/expand.types.js'
	import styleHelper from '$lib/utils/styles.js'

	// import {clickOutside} from '$lib/utils/click-outside.js'

	const {ALIGN_OPPOSITE} = constants

	let {
		id = 'reveal-auto',
		title = 'RevealAuto',
		method = 'POST',
		reveal = 'collapsed',
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

	let expanded = false

	function handleToggle(event) {
		expanded = !expanded
	}

	let buttonAlign = align ? ALIGN_OPPOSITE[align] : ''
	let showBackground = background ? `bg:${background}` : 'bg:inherit'
	let show = `${reveal} ${showBackground}`
	let revealClasses = `form:${reveal} align-self:${buttonAlign} maki:inline size:lg`
	let layoutClass = layout ? `l:${layout}:${size}` : ''

	let layoutClasses = $derived(
		styleHelper.getLayoutStyles({size, height, layout, breakpoint}),
	)

	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined
</script>

<div class={`l:reveal:auto ${layoutClasses}`}>
	<form
		{method}
		action={action
			? actionPath
				? `${actionPath}?/${action}`
				: `?/${action}`
			: undefined}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={revealClasses}
	>
		<Expand
			id={`button-reveal-auto-${id}`}
			{title}
			{color}
			{variant}
			{size}
			type={actionPath && formaction ? 'submit' : 'button'}
			name="reveal-auto"
			controls={`reveal-auto-${id}`}
			value={'menu'}
			asset="context"
			states={EXPAND_MACHINE}
			onclick={handleToggle}
		>
			{title}
		</Expand>
	</form>
	<div
		id={`reveal-auto-${id}`}
		class={`${layoutClass} ${show} ${direction} hug`}
	>
	{#if children}
		{@render children()}
	{/if}
	</div>
</div>
