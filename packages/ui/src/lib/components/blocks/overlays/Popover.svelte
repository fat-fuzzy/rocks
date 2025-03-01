<script lang="ts">
	import type {FuzzyPayload, OverlayProps} from '$types'
	import {UiShape, UiVariant, AriaInvoke} from '$types'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import {onMount} from 'svelte'

	let {
		id,
		open = false,
		role,
		title,
		color,
		size,
		variant = UiVariant.fill,
		shape = UiShape.round,
		children,
		fixed = false,
		place,
		asset,
		invoke = AriaInvoke.auto,
	}: OverlayProps = $props()

	let popover: HTMLElement
	let fixedClass = $state(fixed ? `fixed:${place}` : `place:${place}`)
	let reveal = $state(open ? 'expanded' : 'collapsed')

	onMount(() => {
		if (popover && open) {
			popover.showPopover()
		}
	})

	function toggleReveal(payload: FuzzyPayload) {
		reveal = payload.state
		if (reveal === 'expanded') {
			popover.showPopover()
		}
		if (reveal === 'collapsed') {
			popover.hidePopover()
		}
	}

	let states = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			asset: asset ?? asset,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			asset: asset ?? asset,
		},
	}

	let popoverAnchorStyle = $derived(`--anchor-name: --popover-anchor-${id}`)
</script>

<ff-popover {id} class={fixedClass}>
	<span class="anchor" style={popoverAnchorStyle}>
		<Expand
			{asset}
			id={`button-popover-${id}`}
			{title}
			{size}
			{color}
			{states}
			{variant}
			{shape}
			initial={open ? 'expanded' : 'collapsed'}
			name={`button-popover-${id}`}
			popovertarget={`${id}-popover`}
			onclick={toggleReveal}
		/>
	</span>
	<div
		id={`${id}-popover`}
		bind:this={popover}
		{role}
		popover={invoke}
		aria-live="polite"
		class={fixed ? `fixed:${place}` : `place:${place}`}
		style={popoverAnchorStyle}
	>
		{@render children()}
	</div>
</ff-popover>
