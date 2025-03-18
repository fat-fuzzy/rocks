<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {enhance} from '$app/forms'

	import {DismissEvent} from '$types'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	const {ALIGN_ANIMATION_DIRECTION, ALIGN_OPPOSITE, DEFAULT_REVEAL_STATE} =
		constants

	let {
		id = 'Reveal',
		name = 'Reveal',
		title = 'Reveal',
		method = 'POST', // TODO: change to GET with params
		auto = false,
		formaction,
		actionPath,
		redirect,
		layout,
		reveal = DEFAULT_REVEAL_STATE.reveal,
		place = 'top',
		element = 'div',
		position,
		color,
		size,
		font,
		breakpoint,
		// trigger = ButtonEvent.click,
		dismiss = DismissEvent.click,
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

	let expanded = $derived(reveal)
	let payload = $derived({state: expanded, id: `button-reveal-${id}`})
	let revealContent: HTMLFormElement | undefined
	let disabled: boolean | undefined = $state(undefined)

	function toggleReveal(event: Event) {
		if (onclick) {
			onclick(payload)
		}
	}

	let layoutClasses = $derived.by(() =>
		styleHelper.getLayoutStyles({
			height,
			align,
			justify,
			layout,
			position,
			breakpoint,
			background,
			layer,
		}),
	)

	let revealLayoutClasses = $derived(`${expanded} ${layoutClasses}`)
	let revealClasses = $derived(
		auto
			? `l:reveal:auto ${revealLayoutClasses}`
			: `l:reveal ${revealLayoutClasses}`,
	)
	let placeIcon = justify ? ALIGN_OPPOSITE[justify] : ''

	let revealStates = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			text: title,
			asset: asset
				? asset
				: `point-${ALIGN_ANIMATION_DIRECTION[place]['expanded']}`,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			text: title,
			asset: asset
				? asset
				: `point-${ALIGN_ANIMATION_DIRECTION[place]['collapsed']}`,
		},
	}

	let action = $state(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	function onKeyUp(e: KeyboardEvent) {
		if (e.key === 'Escape' && revealContent) {
			payload.state = 'collapsed'
			clickOutside(revealContent, () => {
				payload.state = 'collapsed'
				toggleReveal(e)
			})
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (dismiss === DismissEvent.outside && revealContent) {
			clickOutside(revealContent, () => {
				payload.state = 'collapsed'
				toggleReveal(e)
			})
		}
	}
</script>

<svelte:window onkeyup={onKeyUp} onclick={handleClickOutside} />

{#if auto}
	<svelte:element this={element} {id} class={revealClasses} aria-label={title}>
		{@render revealForm()}
	</svelte:element>
{:else}
	{@render revealForm()}
{/if}

{#snippet revealForm()}
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
			{title}
			{color}
			{variant}
			{size}
			controls={`${id}-reveal`}
			{asset}
			justify={`${justify} nowrap`}
			initial={expanded}
			place={placeIcon}
			states={revealStates}
			{disabled}
		>
			<span class={`ellipsis text:${justify} font:${font}`}>{title}</span>
		</Expand>
	</form>
	<ff-reveal id={`${id}-reveal`} bind:this={revealContent}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
{/snippet}
