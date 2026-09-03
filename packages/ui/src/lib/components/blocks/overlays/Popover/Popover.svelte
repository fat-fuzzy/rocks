<script lang="ts">
	import type {OverlayProps, UiState} from '$types'

	import {onMount} from 'svelte'
	import actor from './actor.svelte'
	import constants from '$lib/types/constants.js'
	import styleHelper from '$lib/utils/styles'

	const {TRANSITION_REVEAL} = constants

	let {
		id,
		role,
		label,
		color,
		font,
		size,
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
	let revealClasses = $derived(`${positionClass} ${layerClass}`)

	let buttonClasses = $derived(
		styleHelper.getStyles({
			color,
			font,
			size,
			variant,
			shape,
			asset,
			assetType,
			align,
			justify,
		}),
	)
	function toggleReveal(event: Event) {
		const target = event.target as HTMLButtonElement
		const updatedValue = TRANSITION_REVEAL[String(target.value)] as UiState
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

<ff-popover {id} data-testid={id}>
	<button
		id={`button-popover-${id}`}
		type="button"
		class={`anchor ${buttonClasses}`}
		name={`button-popover-${id}`}
		popovertarget={`${id}-popover`}
		style={`--anchor-name: --popover-anchor-${id}`}
		onclick={toggleReveal}
		value={reveal ? TRANSITION_REVEAL[reveal] : undefined}
	>
		{label}
	</button>
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
