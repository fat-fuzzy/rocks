<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {DismissEvent} from '$types'
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {clickOutside} from '$lib/utils/click-outside'

	const {ALIGN_OPPOSITE, DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

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
		dismiss,
		text,
		asset,
		init,
		onclick,
	}: RevealLayoutProps = $props()

	let node: HTMLElement
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
	// 		reveal !== 'expanded' ||
	// 		target.id !== `${id}-reveal`
	// 	) {
	// 		return
	// 	}
	// 	reveal = 'collapsed' // TODO: Fix this does nothing
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
	bind:this={node}
	use:enhance
	use:clickOutside
>
	<Expand
		id={`button-reveal-${id}`}
		name={`button-reveal-${id}`}
		{shape}
		{color}
		{variant}
		{size}
		controls={`${id}-reveal-content`}
		asset={buttonAset}
		justify={`${justify} nowrap`}
		initial={TRANSITION_REVEAL[reveal]}
		place={placeIcon}
		states={revealStates}
		{init}
		{onclick}
	>
		<span class={`ellipsis text:${text} font:${font}`}>{label}</span>
	</Expand>
</form>
