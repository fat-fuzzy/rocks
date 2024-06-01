<script lang="ts">
	import type {InputProps} from './input.types.js'

	let {
		id,
		name,
		label = 'Radio input',
		checked = false,
		layout = 'switcher',
		value,

		disabled,
		asset,
		align,
		justify,
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
	let justifyClass = justify ? `justify:${justify}` : ''
	let backgroundClass = background ? `bg:${background}` : ''

	/* Context styles */
	let containerClasses =
		container && size
			? `l:${container}:${size}`
			: container
				? `l:${container} `
				: ''
	let layoutClasses = layout ? `l:${layout}:${size}` : ''
	let contextClasses = `${containerClasses} ${layoutClasses}`

	let elementClasses = `${asset} ${colorClass} ${sizeClass} ${variantClass} ${alignClass} ${justifyClass} ${fontClass} ${backgroundClass}`

	let classes = `${contextClasses} ${elementClasses}`
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
