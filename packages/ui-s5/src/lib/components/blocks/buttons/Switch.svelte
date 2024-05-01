<script lang="ts">
	import type {SwitchProps} from './buttons'
	import {actor} from '$lib/actors/switch'

	let {
		id = 'switch',
		name = 'switch',
		title,
		initial = 'inactive',
		disabled,
		formaction,
		states,
		align,
		asset,
		color,
		size,
		shape,
		variant,
		container,
		dimensions,
		layout = 'flex',
		type = 'submit',
		children,
		onclick,
	}: SwitchProps = $props()

	function handleClick(event: MouseEvent) {
		// The payload corresponds the value that is displayed to the user before the click
		// -> we pass that value to the parent component
		if (currentState.onclick) currentState.onclick(payload)
		if (onclick) onclick(payload)
		// Once the parent has been updated, we switch the current state of the button
		manager.send({type: 'SWITCH'})
	}

	let manager = actor(id, initial, name)
	manager.subscribe((snapshot: any) => {
		switchState = snapshot.value
	})

	/* Element state */
	let switchState = $state(initial)
	let pressed = $derived(switchState === 'active')
	let currentState = $derived(states[switchState])
	let value = $derived(currentState.value)

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
		name,
		value,
		pressed,
	})

	/* Element styles */
	let colorClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = align ? `align:${align}` : ''
	let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${fontClass}`
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`

	/* Context styles */
	let containerClasses =''
	if (container) {
		containerClasses =  dimensions
				? `l:${container}:${dimensions}`
				: `l:${container}:${size}`
	}

	let buttonClasses = $derived.by(() => {
		/* State dependent styles */
		let variantClass = currentState.variant ?? variant
		variantClass =  variantClass ? `variant:${variantClass}`: ''
		let assetClass = (currentState.asset ?? asset) ?? ''
		let stateClasses = `${assetClass} ${variantClass}`

		return `${containerClasses} ${layoutClasses} ${elementClasses} ${stateClasses}`
	})

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
	value={currentState.value}
	class={buttonClasses}
	data-key={name}
	onclick={handleClick}
	aria-pressed={pressed}
>
	{#if children}
		{@render children()}
	{:else}
		{#if shape}
			<span class="sr-only">{title}</span>
		{:else}
			<span class="sr-only">{title}</span>
			<span class="viz-only">{currentState.text}</span>
		{/if}
	{/if}
</button>
