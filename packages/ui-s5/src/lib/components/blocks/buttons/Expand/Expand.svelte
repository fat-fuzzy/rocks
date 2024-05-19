<script lang="ts">
	import { UiState, type ButtonEventType} from '$types/index.js'
	import type {ExpandProps} from './expand.types.js'
	import ExpandStore from './store.svelte'


	let {
		id = 'expand',
		name = 'expand',
		controls,
		title,
		initial = UiState.collapsed,
		disabled,
		formaction,
		states,
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
		children,
		onclick,
	}: ExpandProps = $props()

	let store = $state(new ExpandStore())
	store.init({
		initial,
		onclick,
		expandStates: states,
	})

	/* Element state */
	let currentState = $state(store.getExpandState())

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value: store.getValue(),
		expanded: store.isExpanded(),
		update: store.update.bind(store),
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
	let containerClasses = ''
	if (container) {
		containerClasses = dimensions ? `l:${container}:${dimensions}` : `l:${container}:${size}`
	}

	let buttonClasses = $derived.by(() => {
		/* State dependent styles */
		let variantClass = currentState.variant ?? variant
		variantClass = variantClass ? `variant:${variantClass}` : ''
		let assetClass = currentState.asset ?? asset ?? ''
		let stateClasses = `${assetClass} ${variantClass}`

		return `expand ${containerClasses} ${layoutClasses} ${elementClasses} ${stateClasses}`
	})


	function handleClick(event: MouseEvent) {
		// The payload corresponds the value that is displayed to the user before the click
		// -> we pass that value to the parent component
		if (currentState.onclick) currentState.onclick(payload)
		if (onclick) onclick(payload)
		store.update('expand' as ButtonEventType)
	}
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
	aria-expanded={store.isExpanded()}
	aria-controls={controls}
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
