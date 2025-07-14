<script lang="ts">
	import type {ExpandLinkProps, FuzzyPayload} from '$types'
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
		formaction,
		actionPath,
		onclick,
	}: ExpandLinkProps = $props()

	let linkReveal = $state(
		reveal ? {[slug]: reveal} : {[slug]: DEFAULT_REVEAL_STATE},
	)
	let states = {
		expanded: {
			...EXPAND_MACHINE.expanded,
			asset: asset ? asset : `point-down`,
		},
		collapsed: {
			...EXPAND_MACHINE.collapsed,
			asset: asset ? asset : `point-left`,
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

<div class={layoutClasses}>
	<div class="l:flex nowrap justify:between align:center">
		<a data-sveltekit-preload-data {href} class="font:md">
			{title}
		</a>
		<Expand
			id={`button-reveal-${slug}`}
			{variant}
			{title}
			{size}
			{color}
			{shape}
			initial={reveal.reveal}
			value={linkReveal[slug].reveal}
			name={`reveal-${slug}`}
			controls={`links-${slug}`}
			{states}
			formaction={action}
			onclick={toggleReveal}
		/>
	</div>
	<ff-reveal id={`links-${slug}`} class={`${revealClasses} bg:inherit`}>
		{#if children}
			{@render children()}
		{/if}
	</ff-reveal>
</div>
