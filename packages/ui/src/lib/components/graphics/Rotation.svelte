<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'rotation'
	export let label = 'Angle'
	export let angle = 0
	export let min = 0
	export let max = 360
	export let disabled: boolean

	function update() {
		dispatch('input', {
			value: angle,
		})
	}
</script>

<InputRange
	bind:value={angle}
	{id}
	name={id}
	{label}
	{min}
	{max}
	on:input={update}
	{size}
	{color}
	{disabled}
/>
