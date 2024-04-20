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
		title?: string;
		initial?: UiState;
		value?: string;
		disabled?: boolean;
		formaction?: string;
		states: ButtonStates; // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state

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
		id = 'switch', // TODO: use for machine id
		name = 'switch',
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

	let pressed = $derived(initial === 'active');
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
		`switch:${pressed} ${currentState.asset} ${currentState.variant || variant}`
	);

	// Order is important
	let buttonClasses = $derived(`${stateClasses} ${contextClasses} ${elementClasses}`);

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		pressed
	});
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
	aria-pressed={pressed}
>
	{#if shape}
		<span class="sr-only">{title}</span>
	{:else}
		<span class="sr-only">{title}</span>
		<span class="viz-only">{currentState.text}</span>
	{/if}
</button>
