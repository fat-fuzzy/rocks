<script lang="ts">
	import {createEventDispatcher} from 'svelte'

	const dispatch = createEventDispatcher()

	export let label = 'Checkbox input'
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

	function handleInput(event) {
		const payload = {
			id,
			value: event.target.value,
		}
		dispatch('input', payload)
	}
	$: inputId = `checkbox-${id}`
	$: classes = `l:${layout} bp:${breakpoint} ${size} ${color} ${variant} ${align}`
</script>

<label for={inputId} class={classes}>
	<span class={`font:${size}`}>{label}</span>
	<input
		id={inputId}
		data-test={inputId}
		type="checkbox"
		{value}
		{name}
		{checked}
		on:input={handleInput}
	/>
</label>
