<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ButtonType } from '$types';

	type Props = {
		/**
		 * State props
		 */
		id: string; // TODO: use for machine id
		name: string;
		text?: string;
		title?: string;
		value?: string;
		disabled?: boolean;
		formaction?: string;

		/**
		 * Style props
		 */
		align?: string;
		asset?: string; // emoji:value or svg:value
		color?: string;
		size?: string;
		shape?: string;
		variant?: string;

		container?: string;
		dimensions?: string;
		layout?: string;
		type?: ButtonType;
		children?: Snippet;
		onclick: (event: MouseEvent) => any;
	};
	let {
		id = 'button', // TODO: use for machine id
		name = 'button',
		text,
		title,
		value,
		disabled,
		formaction,
		align,
		asset, // emoji:value or svg:value
		color,
		size,
		shape,
		variant,
		container,
		dimensions,
		layout = 'flex',
		type = 'submit',
		children,
		onclick = (event: MouseEvent) => {
			console.log('click', event);
			console.log('payload', payload);
			return payload;
		}
	}: Props = $props();


	/* Element styles */
	let colorClass = color ? `bg:${color}` : '';
	let sizeClass = size ? `size:${size}` : '';
	let fontClass = size ? `font:${size}` : '';
	let variantClass = variant ? `variant:${variant}` : '';
	let shapeClass = shape ? ` shape:${shape}` : '';
	let alignClass = align ? `align:${align}` : '';

	/* Context styles */
	let containerClasses = container && dimensions
		? `l:${container}:${dimensions}`
		:  container && size ? `l:${container}:${size}` : '';
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`;
	let contextClasses =`${containerClasses} ${layoutClasses}`;

	let elementClasses = `${asset} ${colorClass} ${sizeClass} ${shapeClass} ${variantClass} ${alignClass} ${fontClass}`;

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
	{onclick}
>
	{#if children}
		{@render children()}
	{/if}
</button>
