<script lang="ts">
	import {tick} from 'svelte'
	import {page} from '$app/state'

	import * as validators from '$lib/generated/ajv/validate.ajv.mjs'
	import FormValidator from '$lib/utils/browser/FormValidator.svelte'
	import InputGroup from '$lib/components/blocks/inputs/InputGroup.svelte'
	import {INPUTS} from '$tests/fixtures/form-inputs'

	let validator = new FormValidator('TestFormValidationFunction', validators)
	let form: HTMLFormElement

	const id = 'checkbox_group_select_all'
	const id2 = 'checkbox_group'
	let inputProps = $derived(INPUTS[id])
	let inputProps2 = $derived(INPUTS[id2])

	let items = $derived(
		(INPUTS[id].items || []).map((i) => ({
			...i,
			name: inputProps.name,
			disabled: false,
			validator,
		})),
	)

	let items2 = $derived(
		(INPUTS[id2].items || []).map((i) => ({
			...i,
			name: inputProps2.name,
			label: `${i.label} Bis`,
			disabled: false,
			validator,
		})),
	)

	async function handleInput() {
		await tick()
		form.requestSubmit()
	}
</script>

<form action={page.url.pathname} bind:this={form} class="l:stack:md">
	<section class="l:stack align:start justify:between">
		<div class="l:flex w:full size:2xs align:baseline justify:between">
			<h3>Main Blocks</h3>
		</div>
		<div class="l:flex size:2xs align:start justify:between">
			<InputGroup
				id={INPUTS[id].name}
				name={INPUTS[id].name}
				legend={INPUTS[id].legend}
				type="checkbox"
				value={page.url.searchParams.getAll(INPUTS[id].name)}
				size="2xs"
				color="primary"
				variant="outline"
				{items}
				oninput={handleInput}
				{validator}
			/>
			<InputGroup
				id={INPUTS[id2].name}
				name={INPUTS[id2].name}
				legend={INPUTS[id2].legend}
				type="checkbox"
				value={page.url.searchParams.getAll(INPUTS[id2].name)}
				size="2xs"
				color="primary"
				variant="outline"
				items={items2}
				oninput={handleInput}
				{validator}
			/>
		</div>
	</section>
</form>
