<script lang="ts">
	import type {ExpandProps} from './expand.types.js'
	import { onMount } from 'svelte'
	import { ButtonEvent } from '../button.types.js'
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
		container,
		dimensions,
		layout = 'switcher',
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
		update: store.update.bind(store),
	})

	let buttonClasses = $derived(store.getStyles({
			color,
			size,
			shape,
			align,
			justify,
			asset,
			variant,
			layout,
			container,
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
