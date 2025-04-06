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
	let pageHeaderClass = $derived(dimensions ? '' : 'l:text:md maki:auto')
	let contextReval = $derived(context?.reveal || '')
	let contextTitle = $derived(context?.title || 'On this Page')

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
		<div class={`page-header ${pageHeaderClass}`}>
			<PageHeader {...header} size={size as UiSize} {justify} />
		</div>

		{#if nav && nav.length > 0}
			<div class="page-nav">
				<PageNav id="page-nav" {hash} items={nav} />
			</div>
		{/if}

		<div class="page-main">
			{@render main()}
		</div>
	</main>

	<div id={`context-${id}`} class={`page-context ${mediaClass}`}>
		{#if context && aside}
			<Reveal
				id="pageContext"
				name="pageContext"
				element="aside"
				auto={true}
				reveal={contextReval}
				label={contextTitle}
				position={false}
				place="left"
				color="primary"
				justify="evenly"
				font="sm"
				size="sm"
				scroll="y"
				variant="outline"
				breakpoint="xs"
				formaction="togglePageContext"
				dismiss="outside"
			>
				{@render aside()}
			</Reveal>
		{/if}
	</div>
</div>

<div class="main-footer l:text:lg maki:auto">
	{#if footer}
		{@render footer()}
	{/if}
</div>
