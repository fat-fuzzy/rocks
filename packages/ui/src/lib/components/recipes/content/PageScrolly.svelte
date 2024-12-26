<script lang="ts">
	import type {PageScrollyProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import Scrolly from '$lib/components/recipes/animations/scroll/Scrolly.svelte'

	let {
		title = 'PageMain',
		description = `Basic page layout`,
		pageName,
		size,
		layout = 'sidebar',
		justify,
		header,
		fixed = false,
		animations = ['fade'],
		items,
	}: PageScrollyProps = $props()

	let currentPage = $state(pageName ?? title)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass = $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(
		`${layoutClass} ${justifyClass} align:baseline maki:block:lg`,
	)
</script>

<Head pageName={currentPage} {title} {description} />

<main id="content">
	<header class={headerClass}>
		{#if header}
			{@render header()}
		{:else}
			<h1 class="maki:block:md">{title}</h1>
		{/if}
	</header>

	<Scrolly {animations} {fixed} {items} level={0} />
</main>
