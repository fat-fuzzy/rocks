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
	export let threshold = ''
	export let size = ''
	export let align = ''
	export let background = ''
	export let container = ''
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
	$: assetClass = asset.split(':').length > 1 ? asset : ''
	$: classes = `l:switcher:${size} th:${threshold} check ${size} font:${size} ${color} ${variant} ${align} ${backgroundClass} ${container} ${assetClass}`
</script>

<label for={id} class={classes}>
	<span>{label}</span>
	<input
		{id}
		data-test={id}
		type="checkbox"
		{value}
		{name}
		{checked}
		on:input={handleInput}
		{disabled}
	/>
</label>
