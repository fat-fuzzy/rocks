<script lang="ts">
	import type {ButtonType, ButtonPayload, UiState} from '$types'
	import {toggleActor} from '$lib/actors/button-actors'

	type Props = {
		/**
		 * State props
		 */
		id: string // TODO: use for machine id
		name: string
		text?: string
		title?: string
		initial?: UiState
		value?: string
		disabled?: boolean
		formaction?: string

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
		onclick?: (payload: ButtonPayload) => void
	}
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
		asset, // emoji:value or svg:value
		color,
		size,
		shape,
		variant = 'fill',
		container,
		dimensions,
		layout = 'flex',
		type = 'submit',
		onclick,
	}: Props = $props()

	function handleClick(event: MouseEvent) {
		// The payload corresponds the value that is displayed to the user before the click
		// -> we pass that value to the parent component
		if (onclick) onclick(payload)
		// Once the parent has been updated, we switch the current state of the button
		actor.send({type: 'TOGGLE'})
	}

	let actor = toggleActor({id, initial})
	actor.subscribe((snapshot: any) => {
		toggleState = snapshot.value
	})

	/* Element state */
	let toggleState = $state(initial)
	let pressed = $derived(toggleState === 'active')

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

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
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
	{value}
	class={buttonClasses}
	data-key={name}
	onclick={handleClick}
	aria-pressed={pressed}
>
	{text}
</button>
