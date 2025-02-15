<script lang="ts">
	import type {ExpandLinkProps, FuzzyPayload} from '$types'
	import {UiShape, UiVariant, UiState} from '$types'
	import {enhance} from '$app/forms'
	import FormValidator from '$lib/utils/validate-form.svelte.js'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'
	import {onMount} from 'svelte'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		method = 'POST',
		href,
		slug,
		color,
		size,
		variant = UiVariant.bare,
		shape = UiShape.square,
		title,
		asset,
		children,
		reveal = DEFAULT_REVEAL_STATE.reveal,
		onclick,
		oninput,
		formaction,
		actionPath,
		redirect,
	}: ExpandLinkProps = $props()

	let expanded = $derived(reveal)
	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator('UiStateValidationFunction')
	let disabled: boolean | undefined = $state(undefined)
	const inputTypes: {[name: string]: string} = {
		formId: 'text',
		state: 'text', // TODO: fix this - it wont work with multiple reveals
	}

	let states = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			asset: asset ? asset : `point-down`,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			asset: asset ? asset : `point-left`,
		},
	}
	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	let layoutClasses = $derived(`l:reveal top ${reveal ?? 'collapsed'}`)

	function handleInput(event: Event) {
		// TODO: test that this works with hidden inputs
		validator.changeInput(event)
		validator.validateInput(event)
	}

	function toggleReveal(payload: FuzzyPayload) {
		if (payload.id !== `button-reveal-${id}`) {
			return
		}
		if (onclick) {
			onclick(payload)
		}
	}

	onMount(() => {
		if (boundForm) {
			formData = new FormData(boundForm)
			validator.init(formData, inputTypes)
		}
	})
</script>

<div class={layoutClasses}>
	<div class="l:flex nowrap justify:between align:center">
		<a data-sveltekit-preload-data {href} class="font:md">
			{title}
		</a>
		<form
			{method}
			action={action
				? actionPath
					? `${actionPath}?/${action}`
					: `?/${action}`
				: undefined}
			use:enhance
		>
			<!-- TODO: Fix this : there is no form handling around this -->
			<input type="hidden" name="formId" value={slug} oninput={handleInput} />
			<input
				type="hidden"
				name={`state-${slug}`}
				value={reveal}
				oninput={(e) => {
					if (oninput) {
						oninput(e)
					}
				}}
			/>
			<Expand
				id={`button-reveal-${slug}`}
				{variant}
				{title}
				{size}
				{color}
				{shape}
				initial={expanded}
				name={`reveal-${slug}`}
				controls={`links-${slug}`}
				{states}
				onclick={toggleReveal}
				{disabled}
			/>
		</form>
	</div>
	<ff-reveal id={`links-${slug}`}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</div>
