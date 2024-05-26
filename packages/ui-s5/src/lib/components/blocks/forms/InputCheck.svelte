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
	/* Element styles */
	let colorClass = color ? `color:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let alignClass = align ? `align:${align}` : ''
	let backgroundClass = background ? `bg:${background}` : ''

	/* Context styles */
	let containerClasses =
		container && size
			? `l:${container}:${size}`
			: container
				? `l:${container} `
				: ''
	let layoutClasses = layout ? `l:${layout}` : ''
	let contextClasses = `${containerClasses} ${layoutClasses}`

	let elementClasses = `${asset} ${colorClass} ${sizeClass} ${variantClass} ${alignClass} ${fontClass} ${backgroundClass}`

	let classes = `${contextClasses} ${elementClasses}`
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
