<script lang="ts">
	import {onMount, type Snippet} from 'svelte'
	import type {ButtonStates, ButtonPayload, ButtonType, UiState} from '$types'
	import {switchActor} from '$lib/actors/button-actors'

	type Props = {
		/**
		 * State props
		 */
		id: string
		name: string
		title?: string
		initial?: UiState
		disabled?: boolean
		formaction?: string
		states: ButtonStates // this component contains a button that will Switch between these two states. Each state has its own text and asset (if any) and possible style according to its active / inactive state

		/**
		 * Style props
		 */
		align?: string
		asset?: string // emoji:value or svg:value
		color?: string
		size?: string
		shape?: string
		variant?: string

		container?: string
		dimensions?: string
		layout?: string
		type?: ButtonType
		children?: Snippet
		onclick?: (payload: ButtonPayload) => void
	}

	let {
		id = 'switch',
		name = 'switch',
		title,
		initial = 'inactive',
		disabled,
		formaction,
		states,
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
		onclick,
	}: Props = $props()

	function handleClick(event: MouseEvent) {
		// The payload corresponds the value that is displayed to the user before the click
		// -> we pass that value to the parent component
		if (currentState.onclick) currentState.onclick(payload)
		if (onclick) onclick(payload)
		// Once the parent has been updated, we switch the current state of the button
		actor.send({type: 'SWITCH'})
	}

	let actor = switchActor({id, initial})
	actor.subscribe((snapshot: any) => {
		switchState = snapshot.value
	})

	/* Element state */
	let switchState = $state(initial)
	let pressed = $derived(switchState === 'active')
	let currentState = $derived(states[switchState])
	let value = $derived(currentState.value)


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

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
		name,
		value,
		pressed,
	})

	onMount(() => {
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
