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
		size,
		variant = 'fill',
		shape = 'round',
		children,
		fixed,
		place = 'bottom-right',
		asset,
		layer,
		invoke = 'auto',
		onbeforetoggle,
	}: OverlayProps = $props()

	let popover: HTMLElement
	let invoker: HTMLElement | undefined = $state()
	let reveal: UiState | undefined = $derived(actor.getPopoverState(id))

	let positionClass = $derived(fixed ? `fixed:${place}` : `place:${place}`)
	let layerClass = $derived(layer ? `layer:${layer}` : '')
	let revealClasses = $derived(`fixed:${place} ${layerClass}`)
	let positionStyles = $derived(
		invoker ? getPopoverPositionStyles(invoker, place) : '',
	)

	function toggleReveal(payload: FuzzyPayload) {
		const updatedValue = TRANSITION_REVEAL[String(payload.value)] as UiState
		actor.updatePopoverState(id, updatedValue)
	}

	/**
	 * Return popover positioning relative to its invoker
	 * @param invoker
	 * @param place
	 */
	function getPopoverPositionStyles(
		invoker: HTMLElement,
		place: string,
	): string {
		const rect = invoker.getBoundingClientRect()
		const vh = window.innerHeight

		const placeCoords = place.split('-')

		const insetBottom = placeCoords[0] === 'top' ? rect.bottom : vh - rect.top
		const insetTop = placeCoords[0] === 'bottom' ? rect.top : 0
		const insetLeft = placeCoords[1] === 'left' ? 0 : rect.left
		const insetRight = placeCoords[1] === 'right' ? 0 : rect.right
		let styles = `--inset-bottom: ${insetBottom}px; --inset-right: ${insetRight}px; --inset-top: ${insetTop}px; --inset-left: ${insetLeft}px`
		return styles
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

<ff-popover {id} data-testid={id} class="anchor">
	<span
		class={positionClass}
		data-anchorid={`popover-anchor-${id}`}
		bind:this={invoker}
	>
		<Button
			{asset}
			id={`button-popover-${id}`}
			type="button"
			{label}
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
		style={positionStyles}
	>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</ff-popover>
