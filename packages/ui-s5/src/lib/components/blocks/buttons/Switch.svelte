<script lang="ts">

	import { onMount } from 'svelte'
	import type {SwitchProps} from './button.types.js'

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
		onclick,
		children,
		actor
	}: SwitchProps = $props()

	/* Element state */
	let state = $state(initial)
	let currentState = $derived(states[state])
	let pressed = $derived(state === 'active')
	let value = $derived(currentState.value)

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
		name,
		value,
		pressed,
		actor,
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

		return `switch ${containerClasses} ${layoutClasses} ${elementClasses} ${stateClasses}`
	})


	function handleClick(event: MouseEvent) {
		actor.send({type: 'SWITCH'})
		if (currentState.onclick) currentState.onclick(payload)
		else if (onclick) onclick(payload)
	}

	onMount(() => {
		actor.subscribe((snapshot: any) => {
			state = snapshot.value
		})
		actor.start()
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
