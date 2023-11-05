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
	// export let layout = ''
	// export let breakpoint = ''
	export let size = ''
	export let align = ''
	export let background = ''
	export let container = ''
	export let asset = ''

	function handleInput(event) {
		const payload = {
			id,
			value: event.target.value,
		}
		dispatch('input', payload)
	}
	$: inputId = `checkbox-${id}`
	$: backgroundClass = background ? `bg:${background}` : ''
	$: classes = `l:flex check ${size} font:${size} ${color} ${variant} ${align} ${backgroundClass} ${container} ${asset}`
</script>

<label for={inputId} class={classes}>
	<span>{label}</span>
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
