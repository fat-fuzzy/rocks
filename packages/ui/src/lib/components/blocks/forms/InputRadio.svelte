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
	// export let layout = 'flex'
	// export let breakpoint = ''
	export let threshold = ''
	export let size = ''
	export let align = ''
	export let background = ''
	export let asset = ''
	export let disabled: boolean

	function handleInput(event) {
		const payload = {
			id,
			value: event.target.value,
		}
		dispatch('input', payload)
	}
	$: backgroundClass = background ? `bg:${background}` : ''
	$: classes = `l:switcher:${size} th:${threshold} radio ${size} font:${size}  ${color} ${variant} ${align} ${backgroundClass} ${asset}`
</script>

<label for={id} class={classes}>
	<span>{label}</span>
	<input
		{id}
		type="radio"
		{value}
		{name}
		{checked}
		on:input={handleInput}
		data-test={id}
		{disabled}
	/>
</label>
