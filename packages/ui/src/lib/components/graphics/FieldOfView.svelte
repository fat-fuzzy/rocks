<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	import InputRange from '$lib/components/blocks/forms/InputRange.svelte'

	const dispatch = createEventDispatcher()

	export let color = ''

	export let size = 'xxs'
	export let id = 'fieldOfView'
	export let label = 'Field of View'
	export let fieldOfView = 60
	export let min = 1
	export let max = 179
	export let step = 1
	export let disabled: boolean

	function update() {
		dispatch('input', {
			value: fieldOfView,
		})
	}
</script>

<InputRange
	bind:value={fieldOfView}
	{id}
	name={id}
	{label}
	{max}
	{min}
	on:input={update}
	{size}
	{step}
	{color}
	{disabled}
/>
