<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import {UiEvents} from '$types'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import FormValidator from '$lib/utils/validate-form.svelte.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'

	const {ALIGN_ANIMATION_DIRECTION, ALIGN_OPPOSITE} = constants

	let {
		id = 'reveal',
		name = 'reveal',
		title = 'Reveal',
		method = 'POST', // TODO: change to GET with params
		auto = false,
		formaction,
		layout,
		reveal,
		place = 'top',
		element = 'div',
		position,
		color,
		size,
		breakpoint,
		// trigger = UiEvents.click,
		dismiss = UiEvents.outside,
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
	let initial = $derived(expanded)
	let content: HTMLElement
	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator('UiStateValidationFunction')
	let disabled: boolean | undefined = $state(undefined)

	$effect(() => {
		disabled = validator.formHasErrors()
	})

	function toggleReveal(event) {
		expanded = event.state
		if (onclick) {
			onclick(event)
		}
	}

	let buttonAlign = align ? ALIGN_OPPOSITE[align] : ''
	let elementClasses = $derived(
		styleHelper.getElementStyles({
			color,
			size,
			alignSelf: buttonAlign,
			justify,
			asset,
			variant,
		}),
	)
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
	let formClasses = $derived(`form:${expanded}`)
	let placeIcon = justify ? ALIGN_OPPOSITE[justify] : '' // TODO: fix this
	let revealLayoutClasses = $derived(` ${expanded} ${layoutClasses}`)
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

	let action = $derived(formaction)
	function onKeyUp(e: KeyboardEvent) {
		if (dismiss === UiEvents.outside && e.key === 'Escape') {
			toggleReveal({state: 'collapsed'})
		}
	}

	function handleClickOutside() {
		if (dismiss === UiEvents.outside) {
			clickOutside(content, () => toggleReveal({state: 'collapsed'}))
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
		{name}
		{method}
		action={`?/${action}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
		class={formClasses}
		bind:this={boundForm}
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
			{title}
			{color}
			{variant}
			{size}
			controls={`${id}-reveal`}
			{asset}
			justify={`${justify} nowrap`}
			{initial}
			place={placeIcon}
			onclick={toggleReveal}
			states={revealStates}
			{disabled}
		>
			<span class="ellipsis">{title}</span>
		</Expand>
	</form>
	<ff-reveal id={`${id}-reveal`} bind:this={content}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
{/snippet}
