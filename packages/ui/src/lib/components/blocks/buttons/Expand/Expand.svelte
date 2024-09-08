<script lang="ts">
	import { onMount } from 'svelte'
	import type { ExpandProps} from '$types'
	import { ButtonEvent} from '$types'
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

	let store = new Actor({
			initial,
			onclick,
			machine: states,
		})

	let payload = $derived({
		id: name, // the name is used as the key in FormData: to make this also work in JS, we use the name as the id of the returned value
		name,
		value: store.value,
		expanded: store.expanded,
		state: store.state,
		action: store.update.bind(store),
	})

	let buttonClasses = $derived(store.getStyles({
			color,
			size,
			shape,
			align,
			justify,
			place,
			asset,
			variant,
			layout: shape ? undefined: 'switcher',
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
	aria-expanded={store.expanded}
	aria-controls={controls}
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
		<span class="viz-only">{store.label}</span>
	{/if}
{/if}
</button>
