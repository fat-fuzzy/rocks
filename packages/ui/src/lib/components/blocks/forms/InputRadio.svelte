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
	export let align = ''
	export let background = ''
	export let asset = ''

	function handleInput(event) {
		const payload = {
			id,
			value: event.target.value,
		}
		dispatch('input', payload)
	}
	$: inputId = `radio-${id}`
	$: backgroundClass = background ? `bg:${background}` : ''
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${align} ${backgroundClass} ${asset}`
</script>

<label for={inputId} class={classes}>
	<span class={`font:${size}`}>{label}</span>
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
