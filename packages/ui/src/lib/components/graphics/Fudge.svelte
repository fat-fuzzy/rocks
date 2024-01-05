<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'fudge'
	export let label = 'Fudge'
	export let fudge = 1
	export let max = 2
	export let step = 0.01
	export let disabled: boolean

	function update() {
		dispatch('input', {
			value: fudge,
		})
	}
</script>

<InputRange
	bind:value={fudge}
	{id}
	name={id}
	{label}
	{max}
	on:input={update}
	{size}
	{step}
	{color}
	{disabled}
/>
