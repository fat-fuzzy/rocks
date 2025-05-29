<script lang="ts">
	import type {ToggleProps} from '$types'
	import {UiState, ButtonEvent} from '$types'
	import {onMount} from 'svelte'
	import Actor from './actor.svelte.js'

	let {
		id = 'toggle',
		name = 'toggle',
		label,
		title,
		initial = UiState.inactive,
		value,
		disabled,
		formaction,
		align,
		justify = 'center',
		asset,
		assetType,
		color,
		size,
		shape,
		variant = 'fill',
		dimensions,
		type = 'submit',
		init,
		onclick,
		children,
	}: ToggleProps = $props()

	let store = new Actor({
		initial,
		onclick,
	})

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		state: store.state,
		action: store.update.bind(store),
	})

	let buttonClasses = $derived(
		store.getStyles({
			color,
			size,
			shape,
			align,
			justify,
			asset,
			assetType,
			variant,
			layout: shape && shape !== 'pill' ? undefined : 'switcher',
			dimensions,
		}),
	)

	function handleClick(event: MouseEvent) {
		store.update(store.currentState.event as ButtonEvent)
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
	aria-pressed={store.pressed}
	onclick={handleClick}
	data-testid={id}
>
	{#if children}
		{@render children()}
	{:else if shape}
		<span class="sr-only">{title}</span>
	{:else}
		{label}
	{/if}
</button>
