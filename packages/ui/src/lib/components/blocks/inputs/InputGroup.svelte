<script lang="ts">
	import type {Component} from 'svelte'
	import type {
		FieldsetProps,
		ValidationProps,
		InputCheckProps,
		InputRadioProps,
		UiSize,
	} from '$types'

	import styleHelper from '$lib/utils/styles'
	import Fieldset from '$lib/components/blocks/inputs/Fieldset.svelte'
	import InputRadio from '$lib/components/blocks/inputs/InputRadio.svelte'
	import InputCheck from '$lib/components/blocks/inputs/InputCheck.svelte'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		legend,
		hint,
		value,
		type = 'radio', // checkbox, radio
		items = [],
		layout,
		justify = 'between',
		container,
		background,
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

	let errors = $derived(
		validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

	let enableSelectAll = $derived(type === 'checkbox' && items.length > 5)

	const COMPONENT_IMPORTS: {
		[input: string]: Component<InputCheckProps | InputRadioProps, object, ''>
	} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	let innerLayoutSize = $derived(
		size ? styleHelper.SCALES.DECREASE_2[size] : size,
	)

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
			selected = items.map(
				(item: InputCheckProps | InputRadioProps) => String(item.value) || '',
			)
		} else {
			selected = []
		}

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
	containerSize={innerLayoutSize as UiSize}
	{background}
	{color}
	{asset}
	{assetType}
	{justify}
	ariaDescribedby={hint || errors?.length ? `input-feedback-${id}` : undefined}
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
				containerSize={innerLayoutSize as UiSize}
				id={`all-${id}`}
				oninput={handleSelectAll}
				{validator}
				{isUiControl}
			/>
		</legend>
	{/if}
	{#each items as input, index (index)}
		{@const checked =
			input.value && selected.includes(String(input.value)) ? true : undefined}
		<InputComponent
			{...input}
			value={input.value}
			{checked}
			color={input.color || color}
			background={undefined}
			{justify}
			{container}
			containerSize={innerLayoutSize as UiSize}
			{size}
			{name}
			id={`${name}.${input.value}`}
			oninput={handleInput}
			{isUiControl}
		/>
	{/each}

	{#if children}
		{@render children()}
	{/if}

	<Feedback
		id={`input-feedback-${id}`}
		{hint}
		{errors}
		{size}
		{variant}
		{font}
	/>
</Fieldset>
