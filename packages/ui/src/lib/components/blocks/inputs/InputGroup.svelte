<script lang="ts">
	import type {
		UiSize,
		FieldsetProps,
		InputCheckProps,
		InputRadioProps,
	} from '#types'

	import styleHelper from '#lib/utils/styles.js'
	import Fieldset from '#lib/components/blocks/inputs/Fieldset.svelte'
	import InputRadio from '#lib/components/blocks/inputs/InputRadio.svelte'
	import InputCheck from '#lib/components/blocks/inputs/InputCheck.svelte'
	import Feedback from '#lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		legend,
		hint,
		value,
		selectAll,
		isUiControl,
		type = 'radio', // checkbox, radio
		items = [],
		layout,
		justify = 'start',
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
		errors = [],
	}: FieldsetProps = $props()

	let selected: string[] = $derived(value ?? [])
	let allSelected = $derived(selected.length === items.length)
	let isIndeterminate = $derived(
		selected.length > 0 && selected.length < items.length,
	)

	let enableSelectAll = $derived(
		type === 'checkbox' && (selectAll || items.length > 5),
	)

	const COMPONENT_IMPORTS: {
		[input: string]: typeof InputRadio | typeof InputCheck
	} = {
		radio: InputRadio,
		checkbox: InputCheck,
	}

	function shrink(size?: UiSize): string {
		return size ? styleHelper.SCALES.DECREASE_2[size] : ''
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
	context="form"
	{id}
	{name}
	{type}
	legend={!enableSelectAll ? (legend ?? name) : undefined}
	{layout}
	{size}
	{font}
	{variant}
	{container}
	containerSize={shrink(size) as UiSize}
	{background}
	{color}
	{asset}
	{assetType}
	{justify}
	ariaDescribedby={hint || errors?.length ? `input-feedback-${id}` : undefined}
	{errors}
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
				{size}
				{justify}
				{container}
				containerSize={shrink(size) as UiSize}
				id={`all-${id}`}
				oninput={handleSelectAll}
				{errors}
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
			background={undefined}
			{justify}
			{container}
			containerSize={shrink(input.size ?? size) as UiSize}
			size={input.size ?? size}
			{name}
			id={`${name}.${input.value}`}
			oninput={handleInput}
			{isUiControl}
			color={input.color || color}
			{errors}
		/>
	{/each}

	{#if children}
		{@render children()}
	{/if}

	<Feedback
		context="form"
		id={`input-feedback-${id}`}
		{hint}
		{errors}
		{size}
		{variant}
		{font}
	/>
</Fieldset>
