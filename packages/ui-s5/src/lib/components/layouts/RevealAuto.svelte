<script lang="ts">
	import {enhance} from '$app/forms'
	import type {RevealLayoutProps} from './layout.types.js'
	import constants from '$lib/types/constants.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	// import {clickOutside} from '$lib/utils/click-outside.js'

	const {ALIGN_OPPOSITE} = constants

	let {
		id = 'reveal-auto',
		title = 'RevealAuto',
		method = 'POST',
		reveal = 'minimize',
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
	let show = `show ${showBackground}`
	let showContent = reveal === 'show' ? show : 'hide:viz-only'
	let revealClasses = `form:expand align-self:${buttonAlign} maki:inline lg`
	let layoutClass = layout ? `l:${layout}:${size}` : ''
	let setHeight = height ? ` h:${height}` : ''
	let layoutClasses = `${layoutClass} ${setHeight} l:reveal:auto bp:${breakpoint} ${size} align:${align}`

	let action = formaction
		? redirect
			? `${formaction}&redirectTo=${redirect}`
			: formaction
		: undefined
</script>

<div class={layoutClasses}>
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
			states={{
				expanded: {
					id: 'show',
					text: 'Context',
					value: 'show',
					asset: asset ?? 'emoji:context',
				},
				collapsed: {
					id: 'minimize',
					text: 'Context',
					value: 'minimize',
					asset: asset ?? 'emoji:context',
				},
			}}
			onclick={handleToggle}
		>
			{title}
		</Expand>
	</form>
	<div
		id={`reveal-auto-${id}`}
		class={`${layoutClass} ${showContent} ${direction} hug`}
	>
	{#if children}
		{@render children()}
	{/if}
	</div>
</div>
