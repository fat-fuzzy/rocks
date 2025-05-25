<script lang="ts">
	import type {CookiesPreferencesProps} from '$types'
	import {onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import {UiStatus, UiTextContext, UiColor, UiVariant} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import popoverActor from '$lib/components/blocks/overlays/Popover/actor.svelte'
	import FormValidator from '$lib/utils/validate-form.svelte.js'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'
	import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
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
		size = 'md',
		color = UiColor.accent,
		variant = UiVariant.fill,
		consent,
		onreset,
		onsubmit,
		onchange,
	}: CookiesPreferencesProps = $props()

	let popoverId = 'cookies-banner'
	let formState = $state('pristine')
	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator(
		'CookiePreferencesValidationFunction',
	)

	let updated = $state(consent)
	let cookiesPending = $derived(consent === undefined)
	let cookiesPartial = $derived(
		consent && (consent.analytics || consent.analytics),
	)
	let submitDisabled: boolean | undefined = $state(undefined)
	let resetDisabled = $derived(
		formState === 'reset' || (formState === 'pristine' && !cookiesPartial),
	)
	let successPlaceholder: boolean = $state(false)
	let title = 'Cookies'
	let description = '🍪 This website uses cookies 🍪'
	let successMessage = `Your cookie preferences have been saved. You're all set!`

	const inputTypes: {[name: string]: string} = {
		preferences: 'checkbox_group',
	}

	$effect(() => {
		submitDisabled = validator.formHasErrors()
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
			popoverActor.hidePopover(popoverId)

			if (onsubmit) {
				onsubmit(event)
			}

			formState = 'submitted'
		}
	}

	function handleReset(event: Event) {
		formState = 'reset'
		updated = undefined

		if (onreset) {
			onreset(event)
		}
	}

	function handleFocus(event: Event) {
		formState = 'touched'
		validator.touchInput(event)
	}

	function handleBlur(event: Event) {
		formState = 'touched'
		validator.validateInput(event)
	}

	function handleInput(event: Event) {
		formState = 'dirty'
		validator.changeInput(event)
		validator.validateInput(event)

		if (onchange) {
			onchange({payload: event})
		}
	}

	onMount(() => {
		if (boundForm) {
			formData = new FormData(boundForm)
			validator.init(formData, inputTypes)

			return () => {
				validator.destroy()
			}
		}
	})
</script>

<Popover
	id={popoverId}
	title="Cookies"
	asset="cookie"
	fixed={cookiesPending}
	container="burrito"
	variant="fill"
	layer="3"
	color={cookiesPending ? 'highlight' : cookiesPartial ? 'accent' : 'primary'}
	place="bottom-right"
	onbeforetoggle={(event: Event) => {
		// @ts-expect-error - popover event type is not defined (yet)
		if (event.newState === 'open') {
			formState = 'pristine'
		}
	}}
>
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
			container="burrito:lg "
			{size}
			font="md"
			variant="bare"
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
				<Card justify="center" {size} color="primary" {variant}>
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
								size="sm"
								variant="bare"
								onfocus={handleFocus}
								onblur={handleBlur}
								oninput={handleInput}
								justify="between"
							>
								<InputCheck
									id="functional"
									name="functional"
									type="checkbox"
									label="Site Functionality"
									hint="These cookies allow me to save your preferences on the site (including your cookie preferences). There is no personal data stored in these cookies."
									color="primary"
									asset="none"
									size="sm"
									variant="bare"
									justify="between"
									disabled={true}
									checked={true}
								/>
								<br />
								<InputCheck
									id="analytics"
									name="analytics"
									type="checkbox"
									label="Analytics"
									hint="This cookie allows me to measure the performance of the site as well as viewership. The data used are: referer, browser, device, location (country), date, and page views."
									color="primary"
									asset="none"
									variant="bare"
									size="sm"
									justify="between"
									onfocus={handleFocus}
									onblur={handleBlur}
									oninput={(event) => handleInput(event)}
									checked={updated && updated?.analytics}
								/>
							</InputGroup>
						{/key}
					{/snippet}
					{#snippet footer()}
						<div class="l:flex size:md justify:center">
							<Button
								id="button-reset-cookies"
								name="consent-reset"
								type="reset"
								size="sm"
								{color}
								variant="outline"
								disabled={resetDisabled}
								onclick={handleReset}
							>
								Reset
							</Button>
							<Button
								id="button-submit-cookies"
								{color}
								{variant}
								size="sm"
								name="consent-submit"
								disabled={submitDisabled}
							>
								Save
							</Button>
						</div>
					{/snippet}
				</Card>
			</form>
		</Feedback>
	{/if}
</Popover>
