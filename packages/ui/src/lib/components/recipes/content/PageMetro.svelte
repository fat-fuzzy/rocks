<script lang="ts">
	import type {UiSize, PageRailsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
	import Reveal from '$lib/components/layouts/reveal/Reveal.svelte'

	let {
		id = 'main',
		title = 'PageMetro',
		path = '',
		hash,
		description = `Metro page layout with header, main content and placeable context areas`,
		pageName,
		size,
		dimensions,
		justify,
		main,
		nav,
		aside,
		footer,
		context,
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)

	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')

	let header = $derived({
		title,
		main: headerMain,
		layout: 'flex',
	})
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}
<div class="l:grid zone:page">
	<main {id} class="l:grid zone:main">
		<div class="page-header">
			<PageHeader {...header} size={size as UiSize} {justify} />
		</div>

		{#if nav && nav.length > 0}
			<div class="page-nav">
				<PageNav id="page-nav" {hash} items={nav} />
			</div>
		{/if}

		<div class="page-main">
			{@render main()}

			{#if footer}
				{@render footer()}
			{/if}
		</div>
	</main>

	<div id={`context-${id}`} class={`page-context ${mediaClass} scroll:y`}>
		{#if aside}
			{@render aside()}
		{/if}
	</div>
</div>
