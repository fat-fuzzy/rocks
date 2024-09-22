<script lang="ts">
	import type { RevealLayoutProps} from '$types'
	import {enhance} from '$app/forms'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import {UiState} from '$lib/types/enums.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	const { ALIGN_ANIMATION_DIRECTION, ALIGN_OPPOSITE} = constants

	let {
		id = 'reveal',
		title = 'Reveal',
		method = 'POST',
		formaction,
		actionPath,
		redirect,
		layout,
		reveal = 'collapsed',
		direction = 'tb-lr',
		place = 'top',
		position,
		color,
		size,
		breakpoint,
		variant,
		align,
		justify,
		height,
		background,
		layer,
		asset,
		children,
		onclick,
	}: RevealLayoutProps = $props()

	let expanded = $state(reveal)

	function handleClickOutside(event) {
		expanded = 'collapsed'
	}

	function toggleReveal(event) {
		expanded = event.state
		if (onclick) { onclick(event) }
	}

	let layoutClasses = $derived(styleHelper.getLayoutStyles({
			color,
			size,
			height,
			align,
			asset,
			variant,
			layout,
			position,
			breakpoint,
			background,
			layer
		}))

	let revealClasses = $derived(`l:reveal ${layoutClasses} ${direction} ${expanded}`)
	let placeIcon = justify ? ALIGN_OPPOSITE[justify] : '' // TODO: fix this

	let revealStates = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			text: title,
			asset: `point-${ALIGN_ANIMATION_DIRECTION[place]['expanded']}`,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			text: title,
			asset: `point-${ALIGN_ANIMATION_DIRECTION[place]['collapsed']}`,
		},
	}

	let action =
		$derived(formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction ? formaction : '')
</script>

<form {method}
	action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			update({reset: false})
		}
	}}
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
		initial={expanded}
		text= 'Reveal'
		place={placeIcon}
		onclick={toggleReveal}
		states={revealStates}
	>
		{title}
	</Expand>
	<div id={`${id}-reveal`} class="content">
		{#if children}
			{@render children()}
		{/if}
	</div>
</form>
