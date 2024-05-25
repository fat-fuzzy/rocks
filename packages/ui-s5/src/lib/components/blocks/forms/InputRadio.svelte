<script lang="ts">
	import type {InputProps} from './input.types.js'

	let {
		id,
		name,
		label = 'Radio input',
		checked = false,
		layout = 'flex',
		value,

		disabled,
		asset,
		align = 'center',
		color,
		size,
		variant,
		background,
		container,
		oninput,
	}: InputProps = $props()
	// @ts-check

	function handleInput(event) {
		if (oninput) oninput({value})
	}
	let backgroundClass = background ? `bg:${background}` : ''
	let classes = `l:${layout}:${size} check ${size} font:${size} ${color} ${variant} align:${align} ${backgroundClass} ${container} ${asset}`
</script>

<label for={id} class={classes}>
	<span>{label}</span>
	<input
		{id}
		type="radio"
		{value}
		{name}
		{checked}
		oninput={handleInput}
		data-test={id}
		{disabled}
	/>
</label>
