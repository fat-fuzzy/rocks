<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	// import {clickOutside} from '$lib/utils/click-outside.js'
	import {enhance} from '$app/forms'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import styleHelper from '$lib/utils/styles.js'

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
		justify,
		layer,
		height,
		background,
		asset = 'context',
		children,
		onclick,
	}: RevealLayoutProps = $props()

	let expanded = $state(reveal)

	function toggleReveal(event) {
		expanded = event.state
		if (onclick) {
			onclick(event)
		}
	}

	let buttonAlign = align ? ALIGN_OPPOSITE[align] : ''
	let layoutClasses = $derived(
		styleHelper.getLayoutStyles({
			color,
			size,
			height,
			align,
			asset,
			variant,
			layout,
			breakpoint,
			background,
			layer,
		}),
	)
	let elementClasses = $derived(styleHelper.getElementStyles({justify}))
	let formClasses = $derived(`form:${expanded}`)
	let revealClasses = $derived(
		`l:reveal:auto align-self:${buttonAlign} ${expanded} ${layoutClasses} ${elementClasses}`,
	)

	let action = $derived(
		formaction && redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
				? formaction
				: '',
	)
</script>

<svelte:element this={element} {id} class={revealClasses} aria-label={title}>
	<form
		name={`${id}-reveal`}
		{method}
		action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
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
			{color}
			{variant}
			{size}
			type={actionPath && formaction ? 'submit' : 'button'}
			name="reveal-auto"
			controls={`reveal-auto-${id}`}
			{asset}
			states={EXPAND_MACHINE}
			onclick={toggleReveal}
		>
			{title}
		</Expand>
		<div id={`reveal-auto-${id}`} class="content">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</form>
</svelte:element>
