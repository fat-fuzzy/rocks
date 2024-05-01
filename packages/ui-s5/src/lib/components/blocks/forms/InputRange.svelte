<script lang="ts">
	import type {InputProps} from './input.js'

	let {
		id, // TODO: use for machine id
		name,
		label = 'Range',
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		layout = 'stack',
		items = [],

		disabled,
		align,
		color,
		size,
		variant,
		breakpoint,
		oninput,
	}: InputProps = $props()

	let valueLabel = $state(value)
	let markers: {id: string; label: string; value: number}[] = [{id: '', label: '', value: min}]

	function generateStepsFromItems(items: {id: string; text: string; value: string}[]) {
		let currentValue = min
		items.forEach((item, index) => {
			if (markers[index - 1]) {
				currentValue = markers[index - 1].value + step
			}
			markers[index] = {id: item.id, label: item.text, value: currentValue}
		})
	}

	function handleInput(event) {
		if (items.length) {
			let selectedMarker = markers.find((m) => m.value === value)
			if (selectedMarker) {
				valueLabel = selectedMarker.label
				oninput({
					id: selectedMarker.id,
					name: selectedMarker.label,
					value: valueLabel,
				})
			}
		} else {
			oninput({value})
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

	/* Element styles */
	let colorClass = color ? `color:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let alignClass = align ? `align:${align}` : ''

	let elementClasses = `${colorClass} ${sizeClass} ${variantClass} ${alignClass}`

	/* Context styles */
	let layoutClasses = breakpoint ? `l:${layout} bp:${breakpoint}` : `l:${layout}`

	let inputClasses = `${layoutClasses} ${elementClasses}`

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

<label for={id} class={inputClasses}>
	<span class={`font:${size}`}>
		{label}:
		{valueLabel}
	</span>
	<input
		{id}
		{name}
		data-test={`input-range-${id}`}
		type="range"
		bind:value
		{min}
		{max}
		{step}
		oninput={handleInput}
		list={items ? `${id}-markers` : undefined}
		{disabled}
	/>
	{#if items.length}
		<datalist id={`${id}-markers`} class="l:flex justify:between">
			{#each markers as { id, label, value }}
				<option {id} {label} {value}></option>
			{/each}
		</datalist>
	{/if}
</label>
