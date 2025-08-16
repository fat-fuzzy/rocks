<script lang="ts">
	import type {FuzzyPayload, OverlayProps} from '$types'

	import {onMount} from 'svelte'
	import {UiShape, UiVariant, AriaInvoke, UiState} from '$types'
	import Button from '$lib/components/blocks/buttons/Button.svelte'
	import actor from './actor.svelte'

	let {
		id,
		role,
		title,
		color,
		size,
		variant = UiVariant.fill,
		shape = UiShape.round,
		children,
		fixed,
		place,
		asset,
		layer,
		invoke = AriaInvoke.auto,
		onbeforetoggle,
	}: OverlayProps = $props()

	let popover: HTMLElement
	let invoker: HTMLElement | undefined
	let expanded = $derived(actor.isActive(id))
	let reveal = $derived(expanded ? UiState.expanded : UiState.collapsed)

	let fixedClass = $state(fixed ? `fixed:${place}` : `place:${place}`)
	let layerClass = $state(layer ? `layer:${layer}` : '')
	let revealClasses = $derived(`${fixedClass} ${layerClass}`)

	function toggleReveal(payload: FuzzyPayload) {
		if (payload.value === UiState.expanded) {
			actor.showPopover(id)
		} else if (payload.value === UiState.collapsed) {
			actor.hidePopover(id)
		}
	}

	onMount(() => {
		if (!popover) {
			return
		}
		if (expanded) {
			popover.showPopover()
		}
		if (!invoker) {
			return
		}

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
		/>
	</span>
	<ff-reveal
		id={`${id}-popover`}
		bind:this={popover}
		{role}
		popover={invoke}
		aria-live="polite"
		class={revealClasses}
	>
		{@render children()}
	</ff-reveal>
</ff-popover>
