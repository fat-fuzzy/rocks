<script lang="ts">
	import FormValidator from '$lib/utils/browser/FormValidator.svelte'

	import Input from '$lib/components/blocks/inputs/Input.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {getBasicInputFields} from '$tests/fixtures/form-inputs'
	import {page} from '$app/state'

	const validator = new FormValidator('TestFormValidationFunction')
	const testInputs = getBasicInputFields()

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
		<p class="font:bold">Valid Inputs</p>
		{#each testInputs as props, i (i)}
			{@const isDisabled = props.value.valid === 'disabled'}
			<Input
				id={props.name}
				{...props}
				value={props.value.valid}
				{validator}
				disabled={isDisabled}
				onfocus={handleFocus}
				onblur={handleBlur}
				oninput={handleInput}
			/>
		{/each}
	</form>
</TestContext>
