<script lang="ts">
	import {onMount} from 'svelte'
	import type {FuzzyPayload, SwitchProps} from '$types'
	import {UiState} from '$types'
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
		font,
		shape,
		layout,
		variant,
		dimensions,
		type = 'submit',
		onclick,
		init,
		children,
	}: SwitchProps = $props()

	let actor = new Actor({
		initial,
		onclick,
		machine: states,
	})

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value. TODO : clean this
		name,
		value: actor.value,
		state: actor.state,
		pressed: actor.pressed,
		action: actor.update.bind(actor),
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
			variant,
			layout: shape && shape !== 'pill' ? layout : 'switcher',
			dimensions,
		}),
	)

	function handleClick(event: MouseEvent) {
		if (actor.currentState) actor.update(actor.currentState.event as string)
		if (actor.currentState.action) {
			actor.currentState.action(payload as FuzzyPayload)
		}
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
	value={actor.value}
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
		<span class="sr-only">{title}</span>
		<span class="viz-only">{actor.label}</span>
	{/if}
</button>
