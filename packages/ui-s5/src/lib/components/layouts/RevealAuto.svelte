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
		element = 'div',
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
		asset = 'context',
		children,
	}: RevealLayoutProps = $props()

	let expanded = $state(reveal)

	function toggleReveal(event) {
		expanded = event.state
	}

	let buttonAlign = align ? ALIGN_OPPOSITE[align] : ''
	let layoutClasses = $derived(
		styleHelper.getLayoutStyles({size, height, layout, breakpoint, background, direction}),
	)
	let formClasses = $derived(`form:${expanded}`)
	let revealClasses = $derived(`l:reveal:auto align-self:${buttonAlign} ${expanded} ${layoutClasses}`)

	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined
</script>

<svelte:element {id} this={element} class={revealClasses} aria-label={title}>
	<form
		name={`${id}-reveal`}
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
		class={formClasses}
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
			asset={asset}
			states={EXPAND_MACHINE}
			onclick={toggleReveal}
		>
			{title}
		</Expand>
		<div
			id={`reveal-auto-${id}`}
			class="content"
		>
			{#if children}
				{@render children()}
			{/if}
		</div>
	</form>
</svelte:element>
