<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	export let color = ''

	export let id = 'scale'
	export let legend = 'Scale'
	export let label = ''
	export let size = 'xxs'
	export let scaleX = 0
	export let scaleY = 0
	export let minX = 0
	export let maxX = 0
	export let minY = 0
	export let maxY = 0
	export let disabled: boolean

	const dispatch = createEventDispatcher()

	function updateX() {
		dispatch('input', {
			value: scaleX,
		})
	}

	function updateY() {
		dispatch('input', {
			value: scaleY,
		})
	}
</script>

<Fieldset id="scale-fieldset" {legend} {size} container="box:card">
	<InputRange
		bind:value={scaleX}
		id={`${id}-width`}
		name={`${id}-width`}
		label={`${label} width`}
		min={minX}
		max={maxX}
		on:input={updateX}
		{size}
		{color}
		{disabled}
	/>
	<InputRange
		bind:value={scaleY}
		id={`${id}-height`}
		name={`${id}-height`}
		label={`${label} height`}
		min={minY}
		max={maxY}
		on:input={updateY}
		{size}
		{color}
		{disabled}
	/>
</Fieldset>
