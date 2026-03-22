<script lang="ts">
	import type {UiColor} from '$types'

	import FormValidator from '$lib/utils/browser/FormValidator.svelte'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {INPUTS} from '$tests/fixtures/form-inputs'
	import {page} from '$app/state'

	let {id, skipDisabled}: {id: string; skipDisabled?: boolean} = $props()

	let validator = new FormValidator('TestFormValidationFunction')
	let inputProps = $derived(INPUTS[id])

	let items = $derived(
		(INPUTS[id].items || []).map((i) => ({
			...i,
			name: inputProps.name,
			disabled: skipDisabled ? false : i.disabled,
			validator,
		})),
	)

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
			{items}
			value=""
			id={inputProps.name}
			checked={false}
			{validator}
			onfocus={handleFocus}
			onblur={handleBlur}
			oninput={handleInput}
			{color}
		/>
	</form>
</TestContext>
