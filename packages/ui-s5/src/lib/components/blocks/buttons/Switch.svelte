<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {ButtonStates, ButtonPayload, ButtonType, UiState} from '$types'
	import constants from '$lib/types/constants'

	const {STATE_SWITCHER} = constants

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
		onclick?: (event: MouseEvent, payload: ButtonPayload) => void
	}

	let {
		id = 'switch', // TODO: use for machine id
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
		initial = STATE_SWITCHER[initial]
		if (currentState.onclick) currentState.onclick(event, payload)
		else if (onclick) onclick(event, payload)
	}
	/* Element state */
	let pressed = $derived(initial === 'active')
	let currentState = $derived(states[initial])
	let value = $derived(currentState.value)

	/* Element styles */
	let colorClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = align ? `align:${align}` : ''
	let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${fontClass}`

	/* Context styles */
	let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`
	let containerClasses =
		container && dimensions
			? `l:${container}:${dimensions}`
			: container && size
				? `l:${container}:${size}`
				: ''
	let contextClasses = `${containerClasses} ${layoutClasses}`

	let buttonClasses = $derived.by(() => {
		/* State dependent styles */
		let variantClass = ''
		if (currentState.variant) {
			variantClass = `variant:${currentState.variant}`
		} else if (variant) {
			variantClass = `variant:${variant}`
		}
		let assetClass = ''
		if (currentState.asset) {
			assetClass = currentState.asset
		} else if (asset) {
			assetClass = asset
		}
		let stateClasses = `${assetClass} ${variantClass}`
		return `${contextClasses} ${elementClasses} ${stateClasses}`
	})

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
		name,
		value,
		pressed,
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
