<script lang="ts">
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import type {RevealMenuProps} from './menu.types.js'

	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/expand.types.js'

	const {ALIGN_OPPOSITE, ALIGN_ANIMATION_DIRECTION} = constants
	const VARIANT_MATCH: {[key: string]: string} = {
		outline: 'bare',
		bare: 'bare',
		default: 'outline',
	}

	let {
		id = 'reveal-menu',
		title = 'RevealMenu',
		reveal = 'collapsed',
		formaction,
		actionPath,
		redirect,
		layout = 'stack',
		container = 'card',
		color,
		size,
		threshold,
		variant = '',
		align = 'start',
		height,
		background,
		place = 'left',
		position,
		disabled,
		items = [],
		onclick,
	}: RevealMenuProps = $props()

	let expanded = false

	let menuReveal: {[key: string]: string} = $state({reveal})

	function handleClickOutside(event) {
		// expanded = false
		// TODO : fix this
		// TODO: use dialog
	}

	function toggleMenu(event) {
		expanded = !expanded
	}

	let innerVariant = VARIANT_MATCH[variant]

	let buttonAlign = place ? ALIGN_OPPOSITE[align] : ''
	let animationDirection = place
		? ALIGN_ANIMATION_DIRECTION[place][menuReveal.reveal]
		: ''
	let show = reveal ? `expanded ${place}` : `collapsed ${place}`
	let layoutClasses = position
		? `l:reveal ${position} ${place} ${reveal}`
		: `l:reveal ${place} ${reveal}`
	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction

	let revealStates = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			text: title,
			asset: `point-${animationDirection}`,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			text: title,
			asset: `point-${animationDirection}`,
		},
	}
</script>

<form
	method="post"
	class={layoutClasses}
	action={action && actionPath ? `${actionPath}?/${action}` : `?/${action}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			update({reset: false})
		}
	}}
>
	<Expand
		id={`button-expand-${id}`}
		{variant}
		{title}
		{size}
		{color}
		name={`button-${id}`}
		align={buttonAlign}
		controls={`menu-${id}`}
		value={title}
		states={revealStates}
		onclick={toggleMenu}
	>
		{title}
	</Expand>
	<menu
		id={`menu-${id}`}
		class={`content l:${layout}:${size} ${container}:${size} th:${threshold} layer bg:${background} card:${size} align:${align} ${size} ${show}`}
	>
		{#each items as buttonProps}
			<li>
				<Button
					{onclick}
					variant={innerVariant}
					{color}
					{disabled}
					{...buttonProps}
				/>
			</li>
		{/each}
	</menu>
</form>
