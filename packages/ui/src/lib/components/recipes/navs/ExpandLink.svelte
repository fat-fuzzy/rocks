<script lang="ts">
	import type {ExpandLinkProps, FuzzyPayload, UiState} from '$types'
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
		label,
		asset,
		children,
		reveal,
		depth,
		assetType,
		// formaction,
		// actionPath,
		onclick,
	}: ExpandLinkProps = $props()

	let value = $derived(
		reveal ? {[slug]: {reveal}} : {[slug]: DEFAULT_REVEAL_STATE},
	)

	let defaultAssetDown = $derived(
		assetType === 'svg' ? 'chevron-down' : 'point-down',
	)
	let defaultAssetLeft = $derived(
		assetType === 'svg' ? 'chevron-left' : 'point-left',
	)
	let defaultAssetRight = $derived(
		assetType === 'svg' ? 'chevron-right' : 'point-right',
	)

	let states = $derived({
		expanded: {
			...EXPAND_MACHINE.expanded,
			asset: asset ? asset : defaultAssetDown,
			label: `Hide ${label}`,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			asset: asset ? asset : depth > 1 ? defaultAssetRight : defaultAssetLeft,
			label: `Show ${label}`,
		},
	})

	let revealClasses = $derived(value[slug].reveal ?? 'collapsed')
	let layoutClasses = $derived(`l:reveal top ${revealClasses}`)
	// let action = $state(
	// 	formaction && actionPath
	// 		? `${actionPath}?/${formaction}`
	// 		: `?/${formaction}`,
	// )

	function toggleReveal(payload: FuzzyPayload) {
		// @ts-expect-error state must be UiState (TODO: fix)
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
		{label}
		{size}
		{color}
		{shape}
		{assetType}
		initial={TRANSITION_REVEAL[String(value[slug].reveal)] as UiState}
		controls={`links-${slug}`}
		{states}
		onclick={toggleReveal}
	/>
	<!-- </form> -->
{/snippet}

<div class={layoutClasses}>
	<ff-control class="l:flex nowrap size:3xs justify:between align:center">
		{#if depth > 1}
			{@render expander()}
		{/if}
		<a data-sveltekit-preload-data {href} class="font:md">
			{label}
		</a>
		{#if depth === 1}
			{@render expander()}
		{/if}
	</ff-control>
	<ff-reveal id={`links-${slug}`} class={`${revealClasses} bg:inherit`}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</div>
