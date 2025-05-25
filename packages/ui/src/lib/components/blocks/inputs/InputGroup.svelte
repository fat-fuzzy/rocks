<script lang="ts">
	import type {FieldsetProps, InputProps} from '$types'
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
		layout = 'stack',
		justify = 'between',
		container,
		font,
		size,
		color,
		variant,
		oninput,
		children,
	}: FieldsetProps & Partial<InputProps> = $props()

	const COMPONENT_IMPORTS: {[input: string]: any} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	function handleInput(event: Event, name: string) {
		let target = event.target as HTMLInputElement
		let payload = {
			id,
			name,
			value: target.value,
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
	{font}
	{variant}
	{container}
	{color}
>
	{@const InputComponent = COMPONENT_IMPORTS[type]}
	{#each items as input}
		{@const checked = input.value === value}
		<InputComponent
			{value}
			{checked}
			color={input.color || color}
			{...input}
			{justify}
			{container}
			{size}
			name={id}
			id={`${name}.${input.value}`}
			oninput={(event: Event) => handleInput(event, name)}
		/>
	{/each}
	{#if children}
		{@render children()}
	{/if}
</Fieldset>
