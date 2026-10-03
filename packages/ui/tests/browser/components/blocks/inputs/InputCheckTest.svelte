<script lang="ts">
	import type {UiColor} from '#types'

	import {page} from '$app/state'

	import {TestFormValidator} from '#lib/utils/validate.js'
	import FormValidator from '#lib/utils/browser/FormValidator.svelte'
	import InputCheck from '#lib/components/blocks/inputs/InputCheck.svelte'

	import TestContext from '#tests/browser/TestContext.svelte'
	import {INPUTS} from '#tests/fixtures/form-inputs.ts'

	let {id}: {id: string} = $props()

	let validator = new FormValidator(TestFormValidator)
	let inputProps = $derived(INPUTS[id])

	let isDisabled = $derived(inputProps.value.valid === 'disabled')
	let errors = $derived(validator.getFieldErrors(inputProps.name))
	let color: UiColor = $derived(errors.length ? 'error' : 'primary')

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
		{validator.getFieldErrors(inputProps.name)}<InputCheck
			{...inputProps}
			name={inputProps.name}
			id={`${inputProps.name}.${inputProps.value.valid}`}
			value={inputProps.value.valid}
			checked={false}
			{errors}
			disabled={isDisabled}
			onfocus={handleFocus}
			onblur={handleBlur}
			oninput={handleInput}
			{color}
		/>
	</form>
</TestContext>
