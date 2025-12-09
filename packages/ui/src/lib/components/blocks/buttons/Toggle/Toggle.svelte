<script lang="ts">
	import type {FuzzyPayload, ToggleProps} from '$types'
	import {onMount} from 'svelte'
	import Actor from './actor.svelte.js'

	let {
		id = 'toggle',
		name = 'toggle',
		label,
		title,
		initial = 'inactive',
		value,
		group,
		disabled,
		formaction,
		align,
		justify = 'center',
		asset,
		assetType,
		color,
		size,
		font,
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
		group,
		state: store.state,
		action: store.update.bind(store),
	})

	let buttonClasses = $derived(
		store.getStyles({
			color,
			size,
			font,
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
		store.update('toggle')
		if (onclick) onclick(payload as FuzzyPayload)
	}

	onMount(() => {
		if (init) init(payload as FuzzyPayload)
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
		{label ?? title}
	{/if}
</button>
