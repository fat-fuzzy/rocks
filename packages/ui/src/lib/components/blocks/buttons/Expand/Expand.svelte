<script lang="ts">
	import {onMount} from 'svelte'
	import type {ExpandProps, FuzzyPayload} from '$types'
	import {ButtonEvent, UiState} from '$types'
	import Actor from './actor.svelte.js'

	let {
		id = 'expand',
		name = 'expand',
		controls,
		title,
		initial,
		disabled,
		formaction,
		states,
		align,
		justify = 'center',
		place = 'end',
		asset,
		color,
		size,
		shape,
		variant = 'fill',
		dimensions,
		type = 'submit',
		children,
		init,
		onclick,
	}: ExpandProps = $props()

	let actor = new Actor({
		initial,
		onclick,
		machine: states,
	})

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value: actor.value,
		expanded: actor.expanded,
		state: actor.state,
		action: actor.update.bind(actor),
	})

	let buttonClasses = $derived(
		actor.getStyles({
			color,
			size,
			shape,
			align,
			justify,
			place,
			asset,
			variant,
			layout: shape ? undefined : 'switcher',
			dimensions,
		}),
	)

	function handleClick(event: MouseEvent) {
		actor.update(actor.currentState.event as ButtonEvent)
		if (actor.currentState.action)
			actor.currentState.action(payload as FuzzyPayload)
	}

	onMount(() => {
		if (init) init(payload)
	})

	$effect(() => {
		let expandEvent =
			initial === UiState.collapsed ? ButtonEvent.expand : ButtonEvent.collapse
		actor.update(expandEvent)
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
	aria-expanded={actor.expanded}
	aria-controls={controls}
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
