<script lang="ts">
	import type {InputRangeProps} from '$types'
	import {UiStatus, UiTextContext} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import Feedback from '$lib/components/blocks/global/Feedback.svelte'

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
		status = UiStatus.default,
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
	}: InputRangeProps = $props()

	let valueLabel = $state(value)
	let markers: {id: string; label: string; value: number}[] = [
		{id: '', label: '', value: min},
	]

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

	function handleInput(event) {
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
				oninput({value})
			}
		}
	}

	const classToNumber: {[key: string]: string} = {
		// TODO: figure out a generic way to map range number values to string labels with no JS
		'0': 'xs',
		'25': 'sm',
		'50': 'md',
		'75': 'lg',
		'100': 'xl',
	}
	if (items.length) {
		step = (max - min) / (items.length - 1)
		generateStepsFromItems(items)
		// Set default number value if nojs
		let valueObject = classToNumber[value]
		value = valueObject ? valueObject : value
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
			valueLabel = !Number.isNaN(value) ? value : min + max / 2
		}
	})
</script>

<label for={id} class={inputClasses} data-testid={id}>
	<span class={`font:${font ? font : size}`}>
		{label}:
		{valueLabel}
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
		aria-describedby={hint ? `input-feedback-${id}` : undefined}
	/>
	{#if items.length}
		<datalist id={`${id}-markers`} class="l:flex justify:between">
			{#each markers as { id, label, value }}
				<option {id} {label} {value}></option>
			{/each}
		</datalist>
	{/if}
</label>
{#if hint}
	<Feedback
		id={`input-feedback-${id}`}
		{status}
		context={UiTextContext.form}
		{size}
		{font}
		{variant}
	>
		<p>{hint}</p>
	</Feedback>
{/if}
