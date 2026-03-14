<script lang="ts">
	import type {FuzzyPayload, ToggleProps} from '$types'
	import {onMount} from 'svelte'
	import Actor from './actor.svelte.js'

	let {
		id = 'toggle',
		name = 'toggle',
		label,
		initial = 'inactive',
		value,
		states,
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
		width,
		dimensions,
		type = 'submit',
		init,
		onclick,
		children,
	}: ToggleProps = $props()

	let actor = new Actor()

	let payload = $derived({
		id,
		name,
		value,
		group,
		state: actor.state,
		action: actor.update.bind(actor),
	})

	let currentAsset = $derived(actor.currentState.asset || asset)
	let isIconButton = $derived(
		(shape === 'round' || shape === 'square') && currentAsset,
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
			width,
			asset,
			assetType,
			variant,
			layout: shape ? 'flex' : 'switcher',
			dimensions,
		}),
	)

	function handleClick() {
		if (actor.currentState.event) {
			actor.update(actor.currentState.event)
		}
		if (onclick) onclick(payload as FuzzyPayload)
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
	{value}
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
