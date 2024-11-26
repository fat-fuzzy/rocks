<script lang="ts">
	import type {RevealLayoutProps} from '$types'
	import {UiEvents} from '$types'
	import {enhance} from '$app/forms'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles.js'

	import FormValidator from '$lib/utils/validate-form.svelte.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {onMount} from 'svelte'

	const {ALIGN_ANIMATION_DIRECTION, ALIGN_OPPOSITE} = constants

	let {
		id = 'reveal',
		title = 'Reveal',
		method = 'POST',
		formaction,
		layout,
		reveal,
		place = 'top',
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

	let layoutClasses = $derived(
		styleHelper.getLayoutStyles({
			color,
			size,
			height,
			align,
			justify,
			asset,
			variant,
			layout,
			position,
			breakpoint,
			background,
			layer,
		}),
	)

	let revealClasses = $derived(`l:reveal ${layoutClasses} ${expanded}`)
	let placeIcon = justify ? ALIGN_OPPOSITE[justify] : '' // TODO: fix this

	const inputTypes: {[name: string]: string} = {
		formId: 'text',
		state: 'text',
	}

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

<form
	{method}
	action={`?/${action}`}
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({update}) => {
			update({reset: false})
		}
	}}
	class={revealClasses}
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
		text="Reveal"
		place={placeIcon}
		onclick={toggleReveal}
		states={revealStates}
		{disabled}
	>
		<span class="ellipsis">{title}</span>
	</Expand>
	<ff-popover id={`${id}-reveal`} class="content" bind:this={content}>
		{#if children}
			{@render children()}
		{/if}
	</ff-popover>
</form>
