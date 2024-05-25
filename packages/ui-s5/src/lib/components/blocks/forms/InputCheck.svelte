<script lang="ts">
	import type {InputProps} from './input.types.js'

	let {
		id,
		name,
		label = 'Checkbox input',
		checked,
		layout = 'stack',
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
		data-test={id}
		type="checkbox"
		{value}
		{name}
		{checked}
		oninput={handleInput}
		{disabled}
	/>
</label>
