<script lang="ts">
	import {onMount} from 'svelte'
	import type {FuzzyPayload, SwitchProps} from '$types'
	import Actor from './actor.svelte.js'

	let {
		id = 'switch',
		name = 'switch',
		label,
		initial = 'inactive',
		disabled,
		formaction,
		states,
		align,
		justify = 'center',
		asset,
		assetType,
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

	const actor = new Actor()

	let payload = $derived({
		id,
		name,
		value: actor.value,
		state: actor.state,
		pressed: actor.pressed,
		action: actor.update.bind(actor),
	})

	let currentAsset = $derived(actor.currentState.asset ?? asset)
	let isIconButton = $derived(
		currentAsset &&
			currentAsset !== 'none' &&
			(shape === 'round' || shape === 'square'),
	)
	let ariaLabel = $derived(
		isIconButton ? (actor.currentState.label ?? label ?? name) : undefined,
	)

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
			layout: shape ? 'flex' : 'switcher',
			dimensions,
		}),
	)

	function handleClick(event: MouseEvent) {
		if (actor.currentState.event) {
			actor.update(actor.currentState.event)
		}
		if (actor.currentState.action) {
			actor.currentState.action(payload as FuzzyPayload)
		}
	}

	onMount(() => {
		actor.init({
			initial,
			onclick,
			machine: states,
			label,
		})

		if (init) init(payload as FuzzyPayload)
	})
</script>

<button
	{id}
	{type}
	{name}
	{disabled}
	{formaction}
	value={actor.value}
	class={buttonClasses}
	data-key={name}
	aria-label={ariaLabel}
	aria-pressed={actor.pressed}
	onclick={handleClick}
	data-testid={id}
>
	{#if children}
		{@render children()}
	{:else if !isIconButton}
		<span>{actor.currentState.label ?? label}</span>
	{/if}
</button>
