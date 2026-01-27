<script lang="ts">
	import type {FuzzyPayload, OverlayProps, UiState} from '$types'

	import {onMount} from 'svelte'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import actor from './actor.svelte'
	import constants from '$lib/types/constants.js'

	const {TRANSITION_REVEAL} = constants

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
	let reveal: UiState | undefined = $derived(actor.getPopoverState(id))

	let fixedClass = $derived(fixed ? `fixed:${place}` : `place:${place}`)
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let revealClasses = $derived(`${fixedClass} ${layerClass}`)

	function toggleReveal(payload: FuzzyPayload) {
		const updatedValue = TRANSITION_REVEAL[String(payload.value)] as UiState
		actor.updatePopoverState(id, updatedValue)
	}

	onMount(() => {
		popover.addEventListener('beforetoggle', (event) => {
			if (onbeforetoggle) {
				onbeforetoggle(event)
			}
		})

		actor.addPopover({id, element: popover, state: reveal})

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
			onclick={toggleReveal}
			value={reveal ? TRANSITION_REVEAL[reveal] : undefined}
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
