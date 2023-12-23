<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import Fieldset from '$lib/components/blocks/forms/Fieldset.svelte'
	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let legend = 'Position'
	export let label = ''
	export let id = 'rotation'

	export let color = ''
	export let size = 'xxs'
	export let coordX = 0
	export let coordY = 0
	export let maxX = 0
	export let maxY = 0
	export let disabled: boolean

	function updateX() {
		dispatch('input', {
			value: coordX,
		})
	}

	function updateY() {
		dispatch('input', {
			value: coordY,
		})
	}
</script>

<Fieldset id="position-fieldset" {legend} {size} container="box:card">
	<InputRange
		bind:value={coordX}
		id={`${id}-x`}
		name={`${id}-x`}
		label={`${label} x`}
		max={maxX}
		on:input={updateX}
		{size}
		{color}
		{disabled}
	/>
	<InputRange
		bind:value={coordY}
		id={`${id}-x`}
		name={`${id}-x`}
		label={`${label} y`}
		max={maxY}
		on:input={updateY}
		{size}
		{color}
		{disabled}
	/>
</Fieldset>
