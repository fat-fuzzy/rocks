<script lang="ts">
	import type {Component} from 'svelte'

	import type {
		FieldsetProps,
		ValidationProps,
		InputCheckProps,
		InputRadioProps,
	} from '$types'
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
		asset,
		assetType,
		oninput,
		children,
		validator,
	}: FieldsetProps & ValidationProps = $props()

	let selected: string[] = $derived(value ?? [])
	let allSelected = $derived(selected.length === items.length)
	let isIndeterminate = $derived(
		selected.length > 0 && selected.length < items.length,
	)

	let enableSelectAll = $derived(type === 'checkbox' && items.length > 5)

	const COMPONENT_IMPORTS: {
		[input: string]: Component<InputCheckProps | InputRadioProps, object, ''>
	} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	function handleInput(event: Event) {
		let target = event.target as HTMLInputElement

		switch (type) {
			case 'radio':
				selected = [target.value]
				break
			case 'checkbox':
				selected = selected.includes(target.value)
					? selected.filter((i) => i !== target.value)
					: [...selected, target.value]
				break
			default:
				break
		}

		if (oninput) {
			oninput(event)
		}
	}

	function handleSelectAll(event: Event) {
		let target = event.target as HTMLInputElement

		if (target.checked === true) {
			selected = items.map((item: InputProps) => String(item.value) || '')
		} else {
			selected = []
		}

		selected = selected

		if (oninput) {
			oninput(event)
		}
	}
</script>

<Fieldset
	{id}
	{name}
	{type}
	legend={!enableSelectAll ? (legend ?? name) : undefined}
	{layout}
	{size}
	{font}
	{variant}
	{container}
	{color}
	{asset}
	{assetType}
	{justify}
>
	{@const InputComponent = COMPONENT_IMPORTS[type]}

	{#if enableSelectAll}
		<legend>
			<InputCheck
				label={legend ?? name ?? ''}
				value={`all-${name}`}
				checked={allSelected}
				indeterminate={isIndeterminate}
				{asset}
				{assetType}
				{color}
				{justify}
				{container}
				id={`all-${id}`}
				oninput={(event: Event) => handleSelectAll(event)}
				{validator}
			/>
		</legend>
	{/if}
	{#each items as input, index (index)}
		{@const checked =
			type === 'checkbox' &&
			input.value &&
			selected.includes(String(input.value))
				? true
				: undefined}
		<InputComponent
			{...input}
			value={input.value}
			{checked}
			color={input.color || color}
			{justify}
			{container}
			{size}
			{name}
			id={`${name}.${input.value}`}
			oninput={(event: Event) => handleInput(event)}
		/>
	{/each}
	{#if children}
		{@render children()}
	{/if}
</Fieldset>
