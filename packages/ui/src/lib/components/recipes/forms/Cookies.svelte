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
		container = 'burrito',
		level = 3, // <h*> element level
		size = 'md',
		color = UiColor.accent,
		variant = UiVariant.fill,
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
	let successMessage = `You're all set! Your cookie preferences have been saved`

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
		formaction && redirect ? `${formaction}&redirectTo=${redirect}` : undefined,
	)

	let layoutClasses = styleHelper.getLayoutStyles({
		size,
		layout,
		container,
	})

	function handleSubmit(event: Event) {
		event.preventDefault()

		// TODO: Submit the form here
		// ...
		if (!validator.errors.length) {
			successPlaceholder = true
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
		container="burrito"
		size="lg"
	>
		<form
			{id}
			{method}
			class={layoutClasses}
			action={action && actionPath ? `${actionPath}?/${action}` : undefined}
			use:enhance
			bind:this={boundForm}
			onsubmit={handleSubmit}
		>
			<Card layout="stack" {size} justify="center">
				{#snippet header()}
					<svelte:element this={`h${level}`} class="text:center">
						{title}
					</svelte:element>
					<p class="text:center">{description}</p>
				{/snippet}
				{#snippet main()}
					{#key validator}
						<InputGroup
							id="consent"
							type="check"
							name="cookies"
							{size}
							variant="bare"
							onfocus={handleFocus}
							onblur={handleBlur}
							oninput={handleInput}
							{validator}
							justify="between"
						>
							<InputCheck
								id="consent.site"
								name="consent.site"
								type="checkbox"
								value="false"
								label="Site Cookies"
								hint="These cookies save the state of the site when you interact with things such as Brightness and Contrast settings, or the UI Playground sections."
								{size}
								color="primary"
								asset="none"
								variant="bare"
								justify="between"
								onfocus={handleFocus}
								onblur={handleBlur}
								oninput={(event) => handleInput(event)}
								{validator}
							/>
							<InputCheck
								id="consent.analytics"
								name="consent.analytics"
								type="checkbox"
								value="false"
								label="Analytics Cookies"
								hint="This is a service provided by Cloudflare (https://developers.cloudflare.com/web-analytics/data-metrics/) to measure the performance of the site as well as providing metrics about viewership."
								{size}
								color="primary"
								asset="none"
								variant="bare"
								justify="between"
								onfocus={handleFocus}
								onblur={handleBlur}
								oninput={(event) => handleInput(event)}
								{validator}
							/>
						</InputGroup>
					{/key}
				{/snippet}
				{#snippet footer()}
					<Button
						id="button-submit-cookies"
						{size}
						{color}
						{variant}
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
