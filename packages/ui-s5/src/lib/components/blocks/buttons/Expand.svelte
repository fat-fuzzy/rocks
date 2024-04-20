<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type ButtonType, type UiState } from '$types';
	import type { ButtonStates } from '$types';

	type Props = {
		/**
		 * State props
		 */
		id: string;
		name: string;
		controls: string; // id of the DOM element that is controlled by this button
		text?: string;
		title?: string;
		initial?: UiState;
		value?: string;
		disabled?: boolean;
		formaction?: string;
		states: ButtonStates; // this component contains a button that will Expand the DOM element it controls when active, or minimize it when inactive. Each state can have its own text, style, and asset (if any) according to its active / inactive state

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
		id = 'expand', // TODO: use for machine id
		name = 'expand',
		controls,
		title,
		initial = 'inactive',
		value,
		disabled,
		formaction,
		states,
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
		children,
		onclick = (event: MouseEvent) => {
			console.log('click', event);
			console.log('payload', payload);
			return payload;
		}
	}: Props = $props();

	let expanded = $derived(initial === 'active');
	let currentState = $derived(states[initial]);
	let containerClasses = container?.startsWith('main')
		? `l:${container}:${dimensions}`
		: `l:${container}:${size}`;
	let shapeClass = shape ? ` shape:${shape}` : '';
	let alignClass = align ? `align:${align}` : '';
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`;
	let contextClasses = `${layoutClasses} ${containerClasses}`;
	let elementClasses = `${asset} ${color} ${size} ${shapeClass} ${variant} align:${alignClass} font:${size}`;
	let stateClasses = $derived(
		`expand:${expanded} ${currentState.asset} ${currentState.variant || variant}`
	);
	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		expanded
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
	value={currentState.value}
	class={buttonClasses}
	data-key={name}
	{onclick}
	aria-expanded={expanded}
	aria-controls={controls}
>
	{#if shape}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text ?? title}</span>
	{/if}
</button>
