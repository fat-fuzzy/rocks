<script lang="ts">
	import type {UiColor} from '$types'

	import {tick} from 'svelte'
	import {page} from '$app/state'

	import FormValidator from '$lib/utils/browser/FormValidator.svelte'

	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import TestContext from '$tests/browser/TestContext.svelte'
	import {INPUTS} from '$tests/fixtures/form-inputs'

	let validator = new FormValidator('TestFormValidationFunction')

	let {
		id,
		skipDisabled,
		value,
	}: {
		id: string
		skipDisabled?: boolean
		value?: string[]
	} = $props()

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
</script>

<TestContext>
	<form data-testid="test-form" action={page.url.pathname}>
		<InputGroup
			{...inputProps}
			name={inputProps.name}
			{items}
			{value}
			id={inputProps.name}
			{validator}
			{color}
		/>
	</form>
</TestContext>
