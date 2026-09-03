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
		label,
		color,
		font,
		size = 'md',
		dimension,
		variant = 'fill',
		shape,
		children,
		coords = 'bottom-right',
		position = 'anchored',
		asset,
		assetType,
		align,
		justify,
		layer,
		invoke = 'auto',
		onbeforetoggle,
	}: OverlayProps = $props()

	let popover: HTMLElement
	let reveal: UiState | undefined = $derived(actor.getPopoverState(id))

	let positionClass = $derived(position ? `${position}:${coords}` : '')
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let dimensionClass = $derived(dimension ? `size:${dimension}` : '')
	let revealClasses = $derived(
		`${dimensionClass} ${positionClass} ${layerClass}`,
	)

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

<ff-popover {id} data-testid={id} data-anchor={`--popover-anchor-${id}`}>
	<Button
		id={`button-popover-${id}`}
		type="button"
		{label}
		{font}
		{size}
		{color}
		{variant}
		{asset}
		{assetType}
		{shape}
		{align}
		{justify}
		name={`button-popover-${id}`}
		popovertarget={`${id}-popover`}
		anchorName={`popover-anchor-${id}`}
		onclick={toggleReveal}
		value={reveal ? TRANSITION_REVEAL[reveal] : undefined}
	/>
	<ff-reveal
		id={`${id}-popover`}
		bind:this={popover}
		{role}
		popover={invoke}
		aria-live="polite"
		class={revealClasses}
		data-testid={`${id}-popover`}
		style={`position-anchor: --popover-anchor-${id}`}
	>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</ff-popover>
