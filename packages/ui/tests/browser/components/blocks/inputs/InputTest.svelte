<script lang="ts">
	import FormValidator from '$lib/utils/browser/FormValidator.svelte'

	import Input from '$lib/components/blocks/inputs/Input.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {INPUTS} from '$tests/fixtures/form-inputs'
	import {page} from '$app/state'

	let {id}: {id: string} = $props()

	let validator = new FormValidator('TestFormValidationFunction')
	let inputProps = $derived(INPUTS[id])

	let isDisabled = $derived(inputProps.value.valid === 'disabled')
	let color = $derived(
		validator.getFieldErrors(inputProps.name)?.length ? 'danger' : 'primary',
	)

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
</script>

<TestContext>
	<form data-testid="test-form" action={page.url.pathname}>
		<Input
			{...inputProps}
			id={inputProps.name}
			value=""
			{validator}
			disabled={isDisabled}
			onfocus={handleFocus}
			onblur={handleBlur}
			oninput={handleInput}
			{color}
		/>
	</form>
</TestContext>
