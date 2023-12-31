<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	export let color = ''

	export let id = 'scale'
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

<div class="l:switcher:xs">
	<InputRange
		bind:value={scaleX}
		id={`${id}-width`}
		name={`${id}-width`}
		label="Width"
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
		label="Height"
		min={minY}
		max={maxY}
		on:input={updateY}
		{size}
		{color}
		{disabled}
	/>
</div>
