<script lang="ts">
	import type {ExpandLinkProps, FuzzyPayload} from '$types'
	import {enhance} from '$app/forms'
	import {UiShape, UiVariant} from '$types'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'

	const {DEFAULT_REVEAL_STATE} = constants

	let {
		href,
		slug,
		color,
		size,
		variant = UiVariant.bare,
		shape = UiShape.square,
		title,
		asset,
		children,
		reveal,
		depth,
		assetType,
		formaction,
		actionPath,
		onclick,
	}: ExpandLinkProps = $props()

	let linkReveal = $state(
		reveal ? {[slug]: reveal} : {[slug]: DEFAULT_REVEAL_STATE},
	)

	let defaultAssetDown = assetType === 'svg' ? 'chevron-down' : 'point-down'
	let defaultAssetLeft = assetType === 'svg' ? 'chevron-left' : 'point-left'
	let defaultAssetRight = assetType === 'svg' ? 'chevron-right' : 'point-right'

	let states = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			asset: asset ? asset : defaultAssetDown,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			asset: asset ? asset : depth > 1 ? defaultAssetRight : defaultAssetLeft,
		},
	}

	let revealClasses = $derived(linkReveal[slug].reveal ?? 'collapsed')
	let layoutClasses = $derived(`l:reveal top ${revealClasses}`)
	let action = $state(
		formaction && actionPath
			? `${actionPath}?/${formaction}`
			: `?/${formaction}`,
	)

	function toggleReveal(payload: FuzzyPayload) {
		linkReveal[slug].reveal = payload.state
		if (onclick) {
			onclick(payload)
		}
	}
</script>

{#snippet expander()}
	<form method="POST" {action} use:enhance>
		<Expand
			id={`button-reveal-${slug}`}
			{variant}
			{title}
			{size}
			{color}
			{shape}
			{assetType}
			value={linkReveal[slug].reveal}
			name={`reveal-${slug}`}
			controls={`links-${slug}`}
			{states}
			onclick={toggleReveal}
		/>
	</form>
{/snippet}

<div class={layoutClasses}>
	<div class="l:flex nowrap size:3xs justify:between align:center">
		{#if depth > 1}
			{@render expander()}
		{/if}
		<a data-sveltekit-preload-data {href} class="font:md">
			{title}
		</a>
		{#if depth === 1}
			{@render expander()}
		{/if}
	</div>
	<ff-reveal id={`links-${slug}`} class={`${revealClasses} bg:inherit`}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</div>
