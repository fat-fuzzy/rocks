<script lang="ts">
	import {onMount} from 'svelte'
	import type {ExpandProps, FuzzyPayload} from '$types'
	import Actor from './actor.svelte.js'

	let {
		id = 'expand',
		name = 'expand',
		controls,
		title,
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
		system,
	}: ExpandProps = $props()

	const actor = new Actor()

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value,
		event: actor.event,
		expanded: actor.expanded,
		state: actor.state,
		action: actor.update.bind(actor),
	})

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
			layout: shape && shape !== 'pill' ? undefined : 'switcher',
			dimensions,
		}),
	)

	function handleClick(event: MouseEvent) {
		if (system) {
			system.update(payload)
		} else if (actor.event) {
			actor.update(actor.event)
		}
	}

	onMount(() => {
		actor.init({
			initial,
			onclick,
			machine: states,
		})

		if (init) init(payload as FuzzyPayload)

		if (system && system.setStateItem) {
			system.setStateItem({
				...payload,
				controls,
			})

			return () => {
				if (system.deleteStateItem) system.deleteStateItem(id)
			}
		}
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
