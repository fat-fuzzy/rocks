<script lang="ts">
	import type {FieldsetProps} from '$types'
	import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
	import InputRadio from '$lib/components/blocks/inputs/InputRadio.svelte'
	import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
	let {
		id,
		name,
		legend,
		value,
		type = 'radio', // checkbox, radio
		items = [],
		layout,
		container,
		size,
		color,
		variant,
		oninput,
	}: FieldsetProps = $props()

	// TODO: fix type
	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	function handleInput(event, name: string) {
		let payload = {
			id,
			name,
			value: event.value,
		}
		if (oninput) {
			oninput(payload)
		}
	}
</script>

<Fieldset
	{id}
	{name}
	{type}
	{legend}
	{layout}
	{size}
	{variant}
	container={container ?? ''}
	{color}
>
	{@const InputComponent = COMPONENT_IMPORTS[type]}
	{#each items as input}
		{@const checked = input.value === value}
		<InputComponent
			{...input}
			id={`${name}-${input.value}`}
			{value}
			name={id}
			label={input.label}
			{checked}
			color={input.color || color}
			oninput={(event) => handleInput(event, name)}
		/>
	{/each}
</Fieldset>
