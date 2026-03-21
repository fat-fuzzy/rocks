<script lang="ts">
	import type {UiColor} from '$types'

	import FormValidator from '$lib/utils/browser/FormValidator.svelte'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {INPUTS} from '$tests/fixtures/form-inputs'
	import {page} from '$app/state'

	let {id}: {id: string} = $props()

	let validator = new FormValidator('TestFormValidationFunction')
	let inputProps = $derived(INPUTS[id])

	let isDisabled = $derived(inputProps.value.valid === 'disabled')
	let color: UiColor = $derived(
		validator.getFieldErrors(inputProps.name)?.length ? 'error' : 'primary',
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
		<InputGroup
			{...inputProps}
			name={inputProps.name}
			id={inputProps.name}
			checked={false}
			{validator}
			disabled={isDisabled}
			onfocus={handleFocus}
			onblur={handleBlur}
			oninput={handleInput}
			{color}
		/>
	</form>
</TestContext>
