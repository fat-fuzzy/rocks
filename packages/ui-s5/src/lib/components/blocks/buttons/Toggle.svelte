<script lang="ts">
	import { type ButtonType, type UiState } from '$types';

	type Props = {
		/**
		 * State props
		 */
		id: string; // TODO: use for machine id
		name: string;
		text?: string;
		title?: string;
		initial?: UiState;
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
		onclick: (event: MouseEvent) => any;
	};
	let {
		id = 'toggle', // TODO: use for machine id
		name = 'toggle',
		text,
		title,
		initial = 'inactive',
		value,
		disabled,
		formaction,
		align,
		asset, // emoji:value or svg:value
		color,
		size,
		shape,
		variant = 'fill',
		container,
		dimensions,
		layout = 'flex',
		type = 'submit',
		onclick = (event: MouseEvent) => {
			console.log('click', event);
			console.log('payload', payload);
			return payload;
		}
	}: Props = $props();

	let pressed = $derived(initial === 'active');
	let containerClasses = container?.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`;
	let shapeClass = shape ? ` shape:${shape}` : '';
	let alignClass = align ? `align:${align}` : '';
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`;
	let contextClasses = `${layoutClasses} ${containerClasses}`;
	let elementClasses = `${asset} ${color} ${size} ${shapeClass} ${variant} align:${alignClass} font:${size}`;
	let stateClasses = $derived(`toggle:${pressed}`);

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		pressed
	});

	// Order is important
	let buttonClasses = $derived(`${stateClasses} ${contextClasses} ${elementClasses}`);
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
	aria-pressed={pressed}
>
	{text}
</button>
