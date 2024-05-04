<script lang="ts">
	import type {ToggleProps} from './button.types.js'

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
		children,
    actor
	}: ToggleProps = $props()

	/* Element state */
	let state = $state(initial)

  actor.subscribe((snapshot: any) => {
    state = snapshot.value
  })
  actor.start()

	let pressed = $derived(state === 'active')

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		pressed,
		actor,
	})

	function handleClick(event: MouseEvent) {
		actor.send({type: 'TOGGLE'})
		if (onclick) onclick(payload)
	}

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
	let buttonClasses = `toggle ${containerClass} ${layoutClasses} ${elementClasses}`

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
