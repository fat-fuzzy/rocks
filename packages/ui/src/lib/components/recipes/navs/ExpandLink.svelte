<script lang="ts">
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import { EXPAND_MACHINE } from  '$lib/components/blocks/buttons/Expand/definitions.js'
	import constants from '$lib/types/constants.js'

	const {
		DEFAULT_REVEAL_STATE,
	} = constants


	let {
		href,
		slug,
		color,
		size,
		variant='bare',
		shape='square hug',
		title,
		asset,
		children,
		reveal,
		formaction='/?/toggleSubnav',
		onclick,
	}: any = $props()
	

	let linkReveal = $state(reveal ? {[slug]: reveal} : {[slug] :DEFAULT_REVEAL_STATE})
	let states = {
		expanded: {
			...	EXPAND_MACHINE.expanded,
			asset: asset ? asset: `point-down`,
		},
		collapsed: {
			...	EXPAND_MACHINE.collapsed,
			asset: asset ? asset: `point-left`,
		},
	}

	let layoutClasses = $derived(`l:reveal top ${linkReveal[slug].reveal ?? 'collapsed'}`)

	function toggleReveal(event) {
		linkReveal[slug].reveal = event.state
		if (onclick) { onclick(event) }
	}
</script>

<div class={layoutClasses}>
	<div class="l:flex nowrap justify:between">
		<a data-sveltekit-preload-data href={href} class="font:md">
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
			name="{`reveal-${slug}`}"
			controls={`links-${slug}`}
			{states}
			onclick={toggleReveal}
			{formaction}
		/>
	</div>
	<div id={`links-${slug}`} class='content'>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
