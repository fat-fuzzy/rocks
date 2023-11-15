<script lang="ts">
	import {createEventDispatcher, onMount} from 'svelte'

	const dispatch = createEventDispatcher()

	// @ts-check
	export let id = ''
	export let label = 'Range'
	export let value: string | number = 0
	export let min = 0
	export let max = 100
	export let step = 1
	export let color = ''
	export let variant = ''
	export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let items: any[]
	let layout = 'stack'

	let valueLabel = value
	let markers: {id: string; label: string; value: number}[] = [{id: '', label: '', value: min}]

	function generateStepsFromItems(items: {id: string; text: string; value: string}[]) {
		step = (max - min) / items.length
		let currentValue = min
		items.forEach((item, index) => {
			if (markers[index - 1]) {
				currentValue = markers[index - 1].value + step
			}
			markers[index] = {id: item.id, label: item.text, value: currentValue}
		})
		max = markers[markers.length - 1].value
	}

	function handleInput(event) {
		if (items) {
			let selectedMarker = markers.find((m) => m.value === value)
			if (selectedMarker) {
				valueLabel = selectedMarker.label
				dispatch('input', {
					id: selectedMarker.id,
					name: selectedMarker.label,
					value: valueLabel,
				})
			}
		} else {
			dispatch('input', {value})
		}
	}

	if (items) {
		generateStepsFromItems(items)
		step = max / (items.length - 1)
	}

	$: classes = `l:${layout}:${size} bp:${breakpoint} ${size} ${color} ${variant} ${align}`
	$: {
		if (items) {
			let selectedMarker = markers.find((m) => m.label === value)
			if (selectedMarker) {
				value = selectedMarker.value
				valueLabel = selectedMarker.label
			}
		} else {
			valueLabel = value
		}
	}
</script>

<fieldset class={`l:stack:${size}`}>
	<label for={id} class={classes}>
		<span class={`font:${size}`}>
			{label}:
			{valueLabel}
		</span>
		<input
			{id}
			data-test={`input-range-${id}`}
			type="range"
			bind:value
			{min}
			{max}
			{step}
			on:input={handleInput}
			list={items ? 'markers' : undefined}
		/>
		{#if items && valueLabel !== value}
			<datalist id="markers">
				{#each markers as { id, label, value }}
					<option {id} {label} {value} />
				{/each}
			</datalist>
		{/if}
	</label>
</fieldset>
