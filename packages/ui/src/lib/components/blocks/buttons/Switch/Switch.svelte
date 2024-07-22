<script lang="ts">
	import type { SwitchProps } from './switch.types.js'
	import { onMount } from 'svelte'
	import { UiState } from '$types/index.js'
	import { ButtonEvent } from '../button.types.js'
	import Actor from './actor.svelte.js'

	let {
		id = 'switch',
		name = 'switch',
		title,
		initial = UiState.inactive,
		disabled,
		formaction,
		states,
		align,
		justify = 'center',
		asset,
		color,
		size,
		shape,
		layout,
		variant,
		dimensions,
		type = 'submit',
		onclick,
		init,
		children,
	}: SwitchProps = $props()

	let store = new Actor({
			initial,
			onclick,
			machine: states,
		})

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
		name,
		value: store.value,
		state: store.state,
		pressed: store.pressed,
		update: store.update.bind(store),
	})

	let buttonClasses =  $derived(store.getStyles({
			color,
			size,
			shape,
			align,
			justify,
			asset,
			variant,
			layout: shape ? layout : 'switcher',
			dimensions,
		}))

	function handleClick(event: MouseEvent) {
		store.update(store.currentState.event as ButtonEvent)
		if (store.currentState.action) store.currentState.action(payload)
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
	value={store.value}
	class={buttonClasses}
	data-key={name}
	aria-pressed={store.pressed}
	onclick={handleClick}
	data-testid={id}
>
	{#if children}
		{@render children()}
	{:else}
		{#if shape}
			<span class="sr-only">{title}</span>
		{:else}
			<span class="sr-only">{title}</span>
			<span class="viz-only">{store.text}</span>
		{/if}
	{/if}
</button>
