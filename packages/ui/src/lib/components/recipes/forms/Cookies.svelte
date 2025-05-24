<script lang="ts">
	import type {CookiesPreferencesProps} from '$types'
	import {onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import {UiStatus, UiTextContext, UiColor, UiVariant} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import FormValidator from '$lib/utils/validate-form.svelte.js'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'
	import Card from '$lib/components/recipes/content/Card.svelte'

	let {
		id = 'cookie-preferences',
		method = 'POST',
		actionPath,
		formaction = 'saveCookiePreferences',
		redirect,
		layout = 'stack',
		container = 'center',
		level = 3, // <h*> element level
		size = 'lg',
		color = UiColor.accent,
		variant = UiVariant.fill,
		consent,
		onupdate,
	}: CookiesPreferencesProps = $props()

	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator(
		'CookiePreferencesValidationFunction',
	)
	let disabled: boolean | undefined = $state(undefined)
	let successPlaceholder: boolean = $state(false)
	let title = 'Cookies'
	let description = '🍪 This website uses cookies 🍪'
	let successMessage = `Your cookie preferences have been saved. You're all set!`

	const inputTypes: {[name: string]: string} = {
		preferences: 'checkbox_group',
	}

	$effect(() => {
		disabled = validator.formHasErrors()
	})

	/**
	 * For the form to work:
	 * - `formaction` and `redirect` must be defined (`action` must be defined)
	 * - The `<form>` element must set `action` to `?/${action}` instead of `undefined` (see `action` prop in form element)
	 */
	let action = $derived(
		redirect ? `${formaction}&redirectTo=${redirect}` : formaction,
	)

	let layoutClasses = styleHelper.getStyles({
		size,
		font: 'md',
		layout,
		container,
	})

	function handleSubmit(event: Event) {
		if (!validator.errors.length) {
			if (onupdate) {
				onupdate(event)
			}
		}
	}

	function handleFocus(event: Event) {
		validator.touchInput(event)
	}

	function handleBlur(event: Event) {
		validator.validateInput(event)
	}

	function handleInput(event: Event) {
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

{#if successPlaceholder}
	<Feedback
		id="cookies-saved"
		status={UiStatus.success}
		justify="end"
		context={UiTextContext.form}
	>
		{successMessage}
	</Feedback>
{:else}
	<Feedback
		id="cookies-consent"
		status={UiStatus.default}
		asset="none"
		context={UiTextContext.form}
		container="burrito:xl "
		size="md"
		font="md"
		layer="1"
	>
		<form
			{id}
			{method}
			class={layoutClasses}
			action={action
				? actionPath
					? `${actionPath}?/${action}`
					: `?/${action}`
				: undefined}
			use:enhance={() => {
				// prevent default callback from resetting the form
				return ({update}) => {
					update({reset: false})
				}
			}}
			bind:this={boundForm}
			onsubmit={handleSubmit}
		>
			<Card layout="stack" justify="center">
				{#snippet header()}
					<svelte:element this={`h${level}`} class="text:center">
						{title}
					</svelte:element>
					<p class="text:center">{description}</p>
				{/snippet}
				{#snippet main()}
					{#key validator}
						<InputGroup
							id="consent.functional"
							type="check"
							name="consent"
							{size}
							variant="bare"
							font="md"
							onfocus={handleFocus}
							onblur={handleBlur}
							oninput={handleInput}
							{validator}
							justify="between"
						>
							<InputCheck
								id="functional"
								name="functional"
								type="checkbox"
								label="Site Functionality"
								hint="These cookies save the state of the interface when you interact with settings such as Brightness and Contrast, or other interactive areas of the site."
								{size}
								color="primary"
								asset="none"
								font="md"
								variant="bare"
								justify="between"
								onfocus={handleFocus}
								onblur={handleBlur}
								oninput={(event) => handleInput(event)}
								checked={consent && consent?.functional}
								{validator}
							/>
							<InputCheck
								id="analytics"
								name="analytics"
								type="checkbox"
								label="Analytics"
								hint="This cookie allows me to set up a beacon that measures the performance of the site as well as metrics about viewership. "
								{size}
								color="primary"
								asset="none"
								variant="bare"
								font="md"
								justify="between"
								onfocus={handleFocus}
								onblur={handleBlur}
								oninput={(event) => handleInput(event)}
								checked={consent && consent?.analytics}
								{validator}
							/>
						</InputGroup>
					{/key}
				{/snippet}
				{#snippet footer()}
					<Button
						id="button-submit-cookies"
						size="md"
						{color}
						{variant}
						font="md"
						name="submit"
						alignSelf="center"
						{disabled}
					>
						Save
					</Button>
				{/snippet}
			</Card>
		</form>
	</Feedback>
{/if}
