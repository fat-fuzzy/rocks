<script lang="ts">
	import type {OverlayProps} from '$types'

	import {onMount} from 'svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import actor from './actor.svelte'

	let {
		id,
		role,
		title,
		color,
		size,
		variant = 'fill',
		shape = 'round',
		children,
		fixed,
		place,
		asset,
		layer,
		invoke = 'auto',
		onbeforetoggle,
	}: OverlayProps = $props()

	let popover: HTMLElement
	let invoker: HTMLElement | undefined

	let fixedClass = $derived(fixed ? `fixed:${place}` : `place:${place}`)
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let revealClasses = $derived(`${fixedClass} ${layerClass}`)

	onMount(() => {
		if (onbeforetoggle) {
			popover.addEventListener('beforetoggle', (event) => {
				onbeforetoggle(event)
			})
		}

		return () => {
			actor.removePopover(id)
		}
	})
</script>

<ff-popover {id} bind:this={invoker} class={fixedClass} data-testid={id}>
	<span class="anchor" data-anchorid={`popover-anchor-${id}`}>
		<!-- HTML Validation fails -->
		<!-- TODO: watch issue github.com/validator/validator/issues/1534 -->
		<Button
			{asset}
			id={`button-popover-${id}`}
			type="button"
			{title}
			{size}
			{color}
			{variant}
			{shape}
			name={`button-popover-${id}`}
			popovertarget={`${id}-popover`}
		/>
	</span>
	<ff-reveal
		id={`${id}-popover`}
		bind:this={popover}
		{role}
		popover={invoke}
		aria-live="polite"
		class={revealClasses}
		data-testid={`${id}-popover`}
	>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</ff-popover>
