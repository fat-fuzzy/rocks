<script lang="ts">
	import type { ButtonProps } from './button.types.js'

	let {
		id = 'button', // TODO: use for machine id
		name = 'button',
		title,
		text,
		value,
		disabled,
		formaction,
		align,
		justify = 'center',
		asset, // emoji:value or svg:value
		color,
		size,
		shape,
		variant,
		container,
		dimensions,
		layout = 'switcher',
		type = 'submit',
		children,
		onclick
	}: ButtonProps  = $props();



	function handleClick(event: MouseEvent) {
		if (onclick) onclick(payload)
	}

	/* Element styles */
	let colorClass = color ? `bg:${color}` : '';
	let sizeClass = size ? `size:${size}` : '';
	let fontClass = size ? `font:${size}` : '';
	let assetClass = asset ? `emoji:${asset}` : ''
	let variantClass = variant ? `variant:${variant}` : '';
	let shapeClass = shape ? ` shape:${shape}` : '';
	let alignClass = align ? `align:${align}` : '';
	let justifyClass = justify ? `justify:${justify}` : ''

	/* Context styles */
	let containerClasses = container && dimensions
		? `l:${container}:${dimensions}`
		:  container && size ? `l:${container}:${size}` : '';
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`;
	let contextClasses =`${containerClasses} ${layoutClasses}`;

	let elementClasses = `${assetClass} ${colorClass} ${sizeClass} ${shapeClass} ${variantClass} ${alignClass} ${justifyClass} ${fontClass}`;

	let buttonClasses = `${contextClasses} ${elementClasses}`

	let payload = $state({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value
	});
</script>

<button
	{id}
	{type}
	{name}
	{title}
	{disabled}
	{formaction}
	{value}
	class={buttonClasses}
	data-key={name}
	onclick={handleClick}
>
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{/if}
</button>
