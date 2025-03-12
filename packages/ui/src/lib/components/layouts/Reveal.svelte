<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import {DismissEvent} from '$types'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import FormValidator from '$lib/utils/validate-form.svelte.js'
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
	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator('UiStateValidationFunction')
	let disabled: boolean | undefined = $state(undefined)

	$effect(() => {
		disabled = validator.formHasErrors()
	})

	function toggleReveal(event: Event, payload: {state: string; id: string}) {
		if (payload.id !== `button-reveal-${id}`) {
			return
		}
		if (onclick) {
			onclick(payload)
		}
	}

	let layoutClasses = $derived(
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
	let formClasses = $derived(expanded ? `form:${expanded}` : '')
	let placeIcon = justify ? ALIGN_OPPOSITE[justify] : ''

	// TODO: fix this
	let revealLayoutClasses = $derived(
		expanded ? `${expanded} ${layoutClasses}` : layoutClasses,
	)
	let revealClasses = $derived(
		auto
			? `l:reveal:auto ${revealLayoutClasses}`
			: `l:reveal ${revealLayoutClasses}`,
	)
	const inputTypes: {[name: string]: string} = {
		formId: 'text',
		state: 'text', // TODO: fix this - it wont work with multiple reveals
	}

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

	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	function onKeyUp(e: KeyboardEvent) {
		if (dismiss === DismissEvent.outside && e.key === 'Escape') {
			toggleReveal(e, {state: 'collapsed', id: `button-reveal-${id}`})
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (dismiss === DismissEvent.outside && boundForm) {
			clickOutside(boundForm, () =>
				toggleReveal(e, {state: 'collapsed', id: `button-reveal-${id}`}),
			)
		}
	}

	function handleInput(event: Event) {
		// TODO: test that this works with hidden inputs
		validator.changeInput(event)
		validator.validateInput(event)
	}

	onMount(() => {
		if (boundForm) {
			formData = new FormData(boundForm)
			validator.init(formData, inputTypes)
		}
	})
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
		class={formClasses}
		bind:this={boundForm}
		onsubmit={(e) => toggleReveal}
		action={action
			? actionPath
				? `${actionPath}?/${action}`
				: `?/${action}`
			: undefined}
		use:enhance
	>
		<input type="hidden" name="formId" value={id} oninput={handleInput} />
		<input
			type="hidden"
			name={`state-${id}`}
			value={expanded}
			oninput={handleInput}
		/>
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
	<ff-reveal id={`${id}-reveal`}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
{/snippet}
