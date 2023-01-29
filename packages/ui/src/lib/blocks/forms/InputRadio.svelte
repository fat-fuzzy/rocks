<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	// @ts-check
	export let label = 'Radio input'
	export let name = ''
	export let id = ''
	export let value = ''
	export let checked = false
	export let color = ''
	export let variant = ''
	export let layout = ''
	export let breakpoint = ''
	export let size = ''

	function handleInput(event) {
		const payload = {
			id,
			value: event.target.value,
		}
		dispatch('input', payload)
	}
	$: inputId = `radio-${id}`
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant}`
</script>

<label for={inputId} class={classes}>
	<div>{label}</div>
	<input
		id={inputId}
		data-test={inputId}
		type="radio"
		{value}
		{name}
		{checked}
		on:input={handleInput}
	/>
</label>
