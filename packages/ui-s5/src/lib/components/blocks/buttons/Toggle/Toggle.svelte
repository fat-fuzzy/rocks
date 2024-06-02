<script lang="ts">
	import { UiState, ButtonEventType} from '$types/index.js'
	import type {ToggleProps} from './toggle.types.js'
	import ToggleStore from './store.svelte'
	import { onMount } from 'svelte'

	let {
		id = 'toggle',
		name = 'toggle',
		text,
		title,
		initial =  UiState.inactive,
		value,
		disabled,
		formaction,
		align,
		asset,
		color,
		size,
		shape,
		variant = 'fill',
		container,
		dimensions,
		layout = 'switcher',
		type = 'submit',
		init,
		onclick,
		children,
	}: ToggleProps = $props()

	let store = $state(new ToggleStore())
	store.init({
		initial,
		onclick,
	})

	/* Element state */
	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		state: store.getState(),
		update: store.update.bind(store),
	})

	/* Element styles */
	let colorClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let assetClass = asset ? `emoji:${asset}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = align ? `align:${align}` : ''

	let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${fontClass} ${variantClass} ${assetClass}`
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`

	/* Context styles */
	let containerClass = ''
	if (container) {
		containerClass = dimensions ? `l:${container}:${dimensions}` : `l:${container}:${size}`
	}

	/* State dependent styles */
	let buttonClasses = `toggle ${containerClass} ${layoutClasses} ${elementClasses}`

	function handleClick(event: MouseEvent) {
		store.update('toggle' as ButtonEventType)
		if (onclick) onclick(payload)
	}

	onMount(() => {
		if (init) init(payload)
	})
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
	aria-pressed={store.isPressed()}
>
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{/if}
</button>
