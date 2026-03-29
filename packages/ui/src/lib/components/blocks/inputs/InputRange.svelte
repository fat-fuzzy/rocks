<script lang="ts">
	import type {InputRangeProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/inputs/InputFeedback.svelte'

	let {
		id,
		name,
		label = 'Range',
		value = $bindable(0),
		required,
		min = 0,
		max = 100,
		step = 1,
		disabled,
		items = [],
		hint,
		layout = 'stack',
		container,
		justify,
		color,
		font,
		size,
		variant,
		background,
		breakpoint,
		threshold,
		oninput,
		validator,
	}: InputRangeProps = $props()

	const numberToClass: {[key: string]: string} = {
		// TODO: figure out a generic way to map range number values to string labels with no JS
		'0': 'xs',
		'25': 'sm',
		'50': 'md',
		'75': 'lg',
		'100': 'xl',
	}

	let valueLabel = $state(numberToClass[value])
	let markers: {id: string; label: string; value: number}[] = $derived([
		{id: '', label: '', value: min},
	])

	let errors = $derived(
		validator && validator?.fieldHasChanged(name)
			? validator?.getFieldErrors(name)
			: [],
	)

	// This assignment not work inside a rune
	// svelte-ignore state_referenced_locally
	if (items.length) {
		step = (max - min) / (items.length - 1)
		generateStepsFromItems(items)
	}

	function generateStepsFromItems(
		items: {id: string; label: string; value: string}[],
	) {
		let currentValue = min
		items.forEach((item, index) => {
			if (markers[index - 1]) {
				currentValue = markers[index - 1].value + step
			}
			markers[index] = {id: item.id, label: item.label, value: currentValue}
		})
	}

	function handleInput() {
		if (items.length) {
			let selectedMarker = markers.find((m) => m.value === value)
			if (selectedMarker) {
				valueLabel = selectedMarker.label
				if (oninput) {
					oninput({
						id: selectedMarker.id,
						name: selectedMarker.label,
						value: valueLabel,
					})
				}
			}
		} else {
			if (oninput) {
				oninput({id, name, value})
			}
		}
	}

	let inputClasses = $derived(
		styleHelper.getStyles({
			color,
			size,
			font,
			variant,
			justify,
			layout,
			breakpoint,
			threshold,
			container,
			background: background ? background : 'inherit',
		}),
	)

	$effect(() => {
		if (items.length) {
			let selectedMarker = markers.find((m) => m.label === value)
			if (selectedMarker) {
				value = selectedMarker.value
				valueLabel = selectedMarker.label
			}
		} else {
			valueLabel = !Number.isNaN(value)
				? numberToClass[value]
				: numberToClass[min + max / 2]
					? numberToClass[min + max / 2]
					: String(min + max / 2)
		}
	})
</script>

<label for={id} class={inputClasses} data-testid={id}>
	<span class={`font:${font ? font : size}`}>
		{label}:
		{items.length ? valueLabel : value}
	</span>
	<input
		{id}
		{name}
		type="range"
		bind:value
		{required}
		{min}
		{max}
		{step}
		oninput={handleInput}
		list={items?.length ? `${id}-markers` : undefined}
		{disabled}
		aria-describedby={hint || errors?.length
			? `input-feedback-${id}`
			: undefined}
	/>
	{#if items.length}
		<datalist id={`${id}-markers`} class="l:flex justify:between">
			{#each markers as { id, label, value } (id)}
				<option {id} {label} {value}></option>
			{/each}
		</datalist>
	{/if}
</label>

<Feedback id={`input-feedback-${id}`} {hint} {errors} {size} {variant} {font} />
