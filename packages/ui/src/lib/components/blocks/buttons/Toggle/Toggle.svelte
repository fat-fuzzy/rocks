<script lang="ts">
	import type {FuzzyEvent, FuzzyPayload, ToggleProps} from '$types'
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

	let actor = new Actor({
		initial,
		onclick,
	})
	const update = (event: FuzzyEvent): void => actor.update(event)

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		group,
		state: actor.state,
		action: update,
	})

	let buttonClasses = $derived(
		actor.getStyles({
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
		update('toggle')
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
	aria-pressed={actor.pressed}
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
