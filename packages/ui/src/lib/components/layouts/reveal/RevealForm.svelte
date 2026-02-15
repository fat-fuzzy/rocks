<script lang="ts">
	import type {RevealLayoutProps, UiState} from '$types'
	import {enhance} from '$app/forms'
	import constants from '$lib/types/constants.js'
	import system from '$lib/components/layouts/reveal/system.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	const {ALIGN_OPPOSITE, DEFAULT_REVEAL_STATE} = constants

	let {
		id = 'RevealForm',
		name = 'RevealForm',
		label = 'RevealForm',
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
		text,
		asset,
		init,
		onclick,
	}: RevealLayoutProps = $props()

	let buttonAset = $derived(asset)
	const controlId = $derived(system.getControlId(id))
	const contentId = $derived(system.getContentId(id))

	let placeIcon = $derived(justify ? ALIGN_OPPOSITE[justify] : '')
	let revealStates = $derived({
		expanded: {
			...EXPAND_MACHINE.expanded,
			text: label,
			action: onclick,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			text: label,
			action: onclick,
		},
	})

	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)
</script>

<form
	{name}
	method="POST"
	action={action
		? actionPath
			? `${actionPath}?/${action}`
			: `?/${action}`
		: undefined}
	use:enhance
>
	<Expand
		id={controlId}
		name={controlId}
		{shape}
		{color}
		{variant}
		{size}
		controls={contentId}
		asset={buttonAset}
		justify={`${justify} nowrap`}
		initial={reveal as UiState}
		place={placeIcon}
		states={revealStates}
		{init}
		{onclick}
	>
		<span class={`ellipsis text:${text} font:${font}`}>{label}</span>
	</Expand>
</form>
