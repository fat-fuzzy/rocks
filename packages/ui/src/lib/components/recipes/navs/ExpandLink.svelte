<script lang="ts">
	import type {ExpandLinkProps, FuzzyPayload} from '$types'
	// import {enhance} from '$app/forms'
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import {EXPAND_MACHINE} from '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'

	const {DEFAULT_REVEAL_STATE, TRANSITION_REVEAL} = constants

	let {
		href,
		slug,
		color,
		size,
		variant = 'bare',
		shape = 'square',
		title,
		asset,
		children,
		reveal,
		depth,
		assetType,
		// formaction,
		// actionPath,
		onclick,
	}: ExpandLinkProps = $props()

	let value = $state(
		reveal ? {[slug]: {reveal}} : {[slug]: DEFAULT_REVEAL_STATE},
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

	let revealClasses = $derived(value[slug].reveal ?? 'collapsed')
	let layoutClasses = $derived(`l:reveal top ${revealClasses}`)
	// let action = $state(
	// 	formaction && actionPath
	// 		? `${actionPath}?/${formaction}`
	// 		: `?/${formaction}`,
	// )

	function toggleReveal(payload: FuzzyPayload) {
		// @ts-expect-error state must be UiState (TODO: fix)
		value[slug].reveal = payload.state
		if (onclick) {
			onclick(payload)
		}
	}
</script>

{#snippet expander()}
	<!-- TODO: : generate toggleReveal actions per talk -->
	<!-- <form method="POST" {action} use:enhance> -->
	<Expand
		id={`button-reveal-${slug}`}
		name={`button-reveal-${slug}`}
		{variant}
		{title}
		{size}
		{color}
		{shape}
		{assetType}
		initial={TRANSITION_REVEAL[String(value[slug].reveal)]}
		controls={`links-${slug}`}
		{states}
		onclick={toggleReveal}
	/>
	<!-- </form> -->
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
