<script lang="ts">
	import type {ToggleProps} from './buttons.types.js';
	import {actor} from '$lib/actors/toggle'

	let {
		id = 'toggle',
		name = 'toggle',
		text,
		title,
		initial = 'inactive',
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
		layout = 'flex',
		type = 'submit',
		onclick,
		children
	}: ToggleProps = $props()

	function handleClick(event: MouseEvent) {
		// Once the parent has been updated, we switch the current state of the button
		manager.send({type: 'TOGGLE'})
		// The payload corresponds the value that is displayed to the user before the click
		// -> we pass that value to the parent component
		if (onclick) onclick(payload)
	}

	let manager = actor(id, initial, name)
	manager.subscribe((snapshot: any) => {
		toggleState = snapshot.value
	})

	/* Element state */
	let toggleState = $state(initial)
	let pressed = $derived(toggleState === 'active')

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		pressed,
		actor: manager,
	})

	/* Element styles */
	let colorClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = align ? `align:${align}` : ''
	let assetClass = asset ?? ''
	let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${fontClass} ${variantClass} ${assetClass}`
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`

	/* Context styles */
	let containerClass = ''
	if (container) {
		containerClass = dimensions ? `l:${container}:${dimensions}` : `l:${container}:${size}`
	}

	/* State dependent styles */
	let buttonClasses = `${containerClass} ${layoutClasses} ${elementClasses}`

	$effect(() => {
		manager.start()
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
	aria-pressed={pressed}
>
	{#if children}
		{@render children()}
	{:else if text}
		{text}
	{/if}
</button>
