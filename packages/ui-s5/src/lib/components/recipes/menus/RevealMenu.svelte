<script lang="ts">
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import type {RevealMenuProps} from './menu.types.js'

	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	const {ALIGN_OPPOSITE, ALIGN_ANIMATION_DIRECTION} = constants
	const VARIANT_MATCH: {[key: string]: string} = {
		outline: 'bare',
		bare: 'bare',
		default: 'outline',
	}

	let {
		id = 'reveal-menu',
		title = 'RevealMenu',
		method = 'POST',
		reveal = 'minimize',
		formaction,
		actionPath,
		redirect,
		layout = 'stack',
		container = 'card',
		direction = 'tb-lr',
		color,
		size,
		threshold,
		variant = '',
		align = 'start',
		height,
		background,
		place = 'left',
		position,
		asset,
		content,
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
	let show = reveal ? `show ${place}` : `minimize ${place}`
	let setHeight = height ? ` h:${height}` : ''
	let layoutClasses = position
		? `l:reveal ${position} ${place} ${reveal}`
		: `l:reveal ${place} ${reveal}`
	let action =
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : formaction
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
		states={{
			expanded: {
				id: 'show',
				text: title,
				value: 'show',
				asset: `emoji:point-${animationDirection}`,
			},
			collapsed: {
				id: 'minimize',
				text: title,
				value: 'minimize',
				asset: `emoji:point-${animationDirection}`,
			},
		}}
		onclick={toggleMenu}
	>
		{title}
	</Expand>
	<menu
		id={`menu-${id}`}
		class={`content l:${layout}:${size} ${container}:${size} th:${threshold} layer bg:${background} card:${size} align:${align} ${size}`}
	>
		{#each items as buttonProps}
			<li>
				<Button
					{onclick}
					{...buttonProps}
					variant={innerVariant}
					{color}
					{disabled}
				/>
			</li>
		{/each}
	</menu>
</form>
