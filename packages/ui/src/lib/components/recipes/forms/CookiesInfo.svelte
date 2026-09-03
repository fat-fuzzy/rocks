<script lang="ts">
	import type {CookiesPreferencesProps} from '$types'
	import {onMount} from 'svelte'

	import * as validators from '$lib/generated/ajv/validate.ajv.mjs'
	import FormValidator from '$lib/utils/browser/FormValidator.svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'
	import Popover from '$lib/components/blocks/overlays/Popover/Popover.svelte'
	import Card from '$lib/components/recipes/content/Card.svelte'

	let {
		containerSize = 'lg',
		level = 3, // <h*> element level
		size = 'md',
		color = 'accent',
		variant = 'fill',
		coords,
		consent,
	}: CookiesPreferencesProps = $props()

	let popoverId = 'cookies-banner'
	let boundForm: HTMLFormElement | undefined = $state()
	let formData: FormData | undefined = $state()
	let validator: FormValidator = new FormValidator(
		'CookiePreferencesValidationFunction',
		validators,
	)
	let cookiesPartial = $derived(
		consent && consent.functional && !consent.legitimateInterest,
	)
	let submitDisabled: boolean | undefined = $derived(validator.formHasErrors())
	let title = 'Cookies'
	let description = '🍪 This website uses cookies 🍪'
	let fixed = $derived(!consent ? 'bottom-right' : undefined)

	// TODO: Integrate inputTypes into validator from schema
	const inputTypes: {[name: string]: string} = {
		legitimateInterest: 'checkbox',
		functional: 'checkbox',
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
	role="dialog"
	label="Cookies"
	asset="cookie"
	shape="round"
	container="burrito"
	{containerSize}
	variant="fill"
	layer="3"
	color={cookiesPartial ? 'accent' : 'primary'}
	{coords}
	{fixed}
	dimension="lg"
	font="md"
>
	<Feedback
		id="cookies-consent"
		status="default"
		asset="none"
		context="form"
		container="burrito"
		{containerSize}
		{size}
		font="md"
		variant="bare"
	>
		<Card size="lg" color="primary" {variant} background="inherit">
			{#snippet header()}
				<svelte:element this={`h${level}`} class="text:center">
					{title}
				</svelte:element>
				<p class="text:center">{description}</p>
			{/snippet}
			{#snippet main()}
				<div class="text:start ravioli:lg">
					<h3>Site Functionality</h3>
					<p>
						These cookies allow me to save your preferences on the site
						(including your cookie preferences). No personal data is stored in
						these cookies.
					</p>
					<h3>Legitimate Interest</h3>
					<p>
						This allows me to gauge activity on the site and improve it by using
						privacy friendly statistics provided by <a
							href="https://goatcounter.com">goatcounter.com</a
						>.
					</p>
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
	</Feedback>
</Popover>
