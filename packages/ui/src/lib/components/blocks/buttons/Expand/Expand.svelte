<script lang="ts">
	import {onMount} from 'svelte'
	import type {ExpandProps, FuzzyPayload} from '$types'
	import Actor from './actor.svelte.js'

	let {
		id = 'expand',
		name = 'expand',
		controls,
		label,
		initial = 'expanded',
		value,
		disabled,
		formaction,
		states,
		align,
		assetType,
		justify = 'center',
		place = 'end',
		asset,
		color,
		size,
		font,
		shape,
		variant = 'fill',
		dimensions,
		type = 'submit',
		children,
		init,
		onclick,
	}: ExpandProps = $props()

	const actor = new Actor()

	let payload = $derived({
		id,
		name,
		value,
		expanded: actor.expanded,
		state: actor.state,
		action: actor.update.bind(actor),
	})

	let currentAsset = $derived(actor.currentState.asset || asset)

	let isIconButton = $derived(
		(shape === 'round' || shape === 'square') && currentAsset,
	)

	let buttonClasses = $derived(
		actor.getStyles({
			color,
			size,
			shape,
			font,
			align,
			justify,
			place,
			asset,
			assetType,
			variant,
			layout: isIconButton ? undefined : 'switcher',
			dimensions,
		}),
	)

	function handleClick(event: MouseEvent) {
		if (actor.currentState.event) actor.update(actor.currentState.event)
		if (actor.currentState.action) {
			actor.currentState.action(payload as FuzzyPayload)
		}
	}

	onMount(() => {
		if (init) init(payload as FuzzyPayload)

		actor.init({
			initial,
			onclick,
			machine: states,
			label,
		})
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
	aria-label={isIconButton ? (actor.currentState.label ?? label) : name}
	aria-expanded={actor.expanded}
	aria-controls={controls}
	onclick={handleClick}
	data-testid={id}
>
	{#if children}
		{@render children()}
	{:else if !isIconButton}
		<span aria-hidden={true}>{actor.currentState.label ?? label}</span>
	{/if}
</button>
