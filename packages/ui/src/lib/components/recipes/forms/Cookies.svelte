<script lang="ts">
	import type {CookiesPreferencesProps} from '$types'
	import {onMount} from 'svelte'
	import {enhance} from '$app/forms'

	import styleHelper from '$lib/utils/styles.js'
	import popoverActor from '$lib/components/blocks/overlays/Popover/actor.svelte'
	import FormValidator from '$lib/utils/validate-form.svelte.js'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'
	import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
	import Card from '$lib/components/recipes/content/Card.svelte'
	import {successToast} from '$lib/components/blocks/overlays/Toast/toasts.js'

	let {
		id = 'cookie-preferences',
		actionPath,
		formaction = 'saveCookiePreferences',
		redirect,
		layout = 'stack',
		container,
		level = 3, // <h*> element level
		size = 'md',
		color = 'accent',
		variant = 'fill',
		consent,
		onsubmit,
		onchange,
	}: CookiesPreferencesProps = $props()

	let popoverId = 'cookies-banner'
	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator(
		'CookiePreferencesValidationFunction',
	)

	let cookiesPartial = $derived(
		consent && consent.functional && !consent.legitimateInterest,
	)
	let submitDisabled: boolean | undefined = $state(undefined)
	let title = 'Cookies'
	let description = '🍪 This website uses cookies 🍪'
	let successMessage =
		'Your cookie preferences have been saved! Your can change them any time the footer.'
	let fixed = $derived(!consent ? 'bottom-right' : undefined)

	// TODO: Integrate inputTypes into validator from schema
	const inputTypes: {[name: string]: string} = {
		legitimateInterest: 'checkbox',
		functional: 'checkbox',
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
			successToast(successMessage)
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

		if (onchange) {
			onchange(event)
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
	container="burrito"
	variant="fill"
	layer="3"
	color={cookiesPartial ? 'accent' : 'primary'}
	place="bottom-right"
	{fixed}
>
	<Feedback
		id="cookies-consent"
		status="default"
		asset="none"
		context="form"
		container="burrito:lg "
		{size}
		font="md"
		variant="bare"
	>
		<form
			{id}
			method="POST"
			name="cookie-preferences"
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
			<Card {size} color="primary" {variant} background="inherit">
				{#snippet header()}
					<svelte:element this={`h${level}`} class="text:center">
						{title}
					</svelte:element>
					<p class="text:center">{description}</p>
				{/snippet}
				{#snippet main()}
					<div class="text:start">
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
								{validator}
								justify="between"
							>
								<InputCheck
									id="functional"
									name="functional"
									type="checkbox"
									label="Site Functionality"
									hint="These cookies allow me to save your preferences on the site (including your cookie preferences). No personal data is stored in these cookies."
									color="primary"
									asset="none"
									size="sm"
									variant="bare"
									justify="between"
									disabled={true}
									checked={true}
									{validator}
								/>
								<br />
								<InputCheck
									id="legitimateInterest"
									name="legitimateInterest"
									type="checkbox"
									label="Legitimate Interest"
									hint="This helps me improve this site using privacy friendly statistics provided by goatcounter.com. You are free to turn these off if you wish to do so, but it would be helpful for my work here if you leave them on!"
									color="primary"
									asset="none"
									variant="bare"
									size="sm"
									justify="between"
									onfocus={handleFocus}
									onblur={handleBlur}
									oninput={handleInput}
									checked={consent?.legitimateInterest ?? true}
									{validator}
								/>
							</InputGroup>
						{/key}
					</div>
				{/snippet}
				{#snippet footer()}
					<div class="l:flex size:md justify:center">
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
</Popover>
