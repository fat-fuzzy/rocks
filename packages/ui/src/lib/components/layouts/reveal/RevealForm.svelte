<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	const {ALIGN_OPPOSITE, DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'RevealForm',
		name = 'RevealForm',
		label = 'RevealForm',
		method = 'POST', // TODO: change to GET with params
		formaction,
		actionPath,
		redirect,
		reveal = DEFAULT_REVEAL_STATE.reveal,
		color,
		size,
		shape,
		font,
		variant,
		justify,
		asset,
		init,
		onclick,
	}: RevealLayoutProps = $props()

	let buttonAset = $state(asset)
	$effect(() => {
		buttonAset = asset
	})
	let placeIcon = justify ? ALIGN_OPPOSITE[justify] : ''
	let revealStates = $derived({
		expanded: {
			...EXPAND_MACHINE.expanded,
			text: label,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			text: label,
		},
	})

	let action = $state(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	// function handleClickOutside(e: MouseEvent) {
	// 	const target = e.target as HTMLElement
	// 	if (
	// 		dismiss !== DismissEvent.outside ||
	// 		payload.state !== 'expanded' ||
	// 		target.id !== `${id}-reveal`
	// 	) {
	// 		return
	// 	}
	// 	payload.state = 'collapsed' // TODO: Fix this does nothing
	// }
</script>

<form
	{id}
	{name}
	{method}
	action={action
		? actionPath
			? `${actionPath}?/${action}`
			: `?/${action}`
		: undefined}
	use:enhance
>
	<Expand
		id={`button-reveal-${id}`}
		name={`button-reveal-${id}`}
		{shape}
		{color}
		{variant}
		{size}
		controls={`${id}-reveal`}
		asset={buttonAset}
		justify={`${justify} nowrap`}
		initial={reveal}
		place={placeIcon}
		states={revealStates}
		{init}
		{onclick}
	>
		<span class={`ellipsis text:${justify} font:${font}`}>{label}</span>
	</Expand>
</form>
