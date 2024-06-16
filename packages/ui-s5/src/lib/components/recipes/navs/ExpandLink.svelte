<script lang="ts">
	import Expand from '$lib/components/blocks/buttons/Expand/Expand.svelte'
	import constants from '$lib/types/constants.js'

	const {
		DEFAULT_REVEAL_STATE,
	} = constants


	let {
		href,
		slug,
		color,
		size='2xs',
		variant='bare',
		shape='square hug',
		title,
		children,
		reveal,
	}: any = $props()
	

	function toggleReveal(event) {
		linkReveal[slug].reveal = event.value
	}

	let linkReveal = $state(reveal ? {[slug]:reveal} : {[slug]:DEFAULT_REVEAL_STATE})
	let states = $derived({
		expanded: {
			id: 'expanded',
			value: 'show', // TODO: harmonize show/expand
			asset: `point-down`,
		},
		collapsed: {
			id: 'collapsed',
			value: 'minimize', // TODO: harmonize minimize/collapse
			asset: `point-up`,
		},
	})

	let layoutClasses = $derived(`l:reveal top ${linkReveal[slug].reveal}`)
</script>

<div class={layoutClasses}>
	<div class="l:flex nowrap justify:between">
		<a data-sveltekit-preload-data href={href} class="card:xs font:md">
			{title}
		</a>
		<Expand
			id={`button-expand-${slug}`}
			{variant}
			{title}
			size='sm'
			{color}
			{shape}
			initial={linkReveal[slug].reveal}
			name={`button-expand-${slug}`}
			controls={`links-${slug}`}
			{states}
			onclick={toggleReveal}
			formaction={`expand-${slug}`}
		/>
	</div>
	<div id={`links-${slug}`} class='content'>
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
