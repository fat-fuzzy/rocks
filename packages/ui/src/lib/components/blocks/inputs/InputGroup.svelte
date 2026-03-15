<script lang="ts">
	import type {Component} from 'svelte'

	import type {FieldsetProps, ValidationProps, InputProps} from '$types'
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
	}: FieldsetProps & ValidationProps & Partial<InputProps> = $props()

	let payload = $derived({
		id,
		name,
		value: value ?? '',
	})
	let selected: string[] = $state(payload.value?.split(','))
	let allSelected = $derived(selected.length === items.length)

	let enableSelectAll = $derived(type === 'checkbox' && items.length > 5)

	const COMPONENT_IMPORTS: {
		[input: string]: Component<InputProps, object, ''>
	} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	function handleInput(event: Event) {
		let target = event.target as HTMLInputElement

		switch (type) {
			case 'radio':
				payload.value = target.value
				break
			case 'checkbox':
				if (target.checked === true) {
					selected.push(target.value)
					payload.value = selected.join(',')
				} else {
					selected = selected.filter((i) => i !== target.value)
					payload.value = selected.join(',')
				}
				break
			default:
				break
		}

		if (oninput) {
			oninput(event, payload)
		}
	}

	function handleSelectAll(event: Event) {
		let target = event.target as HTMLInputElement
		if (target.checked === true) {
			selected = items.map((item: InputProps) => String(item.value) || '')
			payload.value = selected.join(',')
			allSelected = true
		} else {
			selected = []
			payload.value = ''
			allSelected = false
		}

		if (oninput) {
			oninput(event, payload)
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
				name={`select-all-${name}`}
				label={legend ?? name}
				value={items.map((item) => item.value).join(',')}
				checked={allSelected}
				{asset}
				{assetType}
				{color}
				{justify}
				{container}
				{id}
				oninput={(event: Event) => handleSelectAll(event)}
				{validator}
			/>
		</legend>
	{/if}
	{#each items as input, index (index)}
		{@const checked =
			allSelected ||
			input.value === payload.value ||
			payload.value.includes(String(input.value))
				? true
				: false}
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
