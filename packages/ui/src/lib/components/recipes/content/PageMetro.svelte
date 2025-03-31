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
		details,
		nav,
		aside,
		footer,
		app,
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)
	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')

	let header = $derived({
		title,
		main: headerMain,
	})
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}

<main {id} class="zone:main">
	<div class="page-header">
		<PageHeader size={size as UiSize} layout="flex" {justify} {...header} />
	</div>

	<div id={`context-${id}`} class={`page-details ${mediaClass}`}>
		{#if nav.length > 0}
			<PageNav id="page-nav" {hash} items={nav} />
		{/if}

		{#if details}
			{@render details()}
		{/if}
	</div>

	<div class="page-main">
		{@render main()}
	</div>
</main>

<div id={`context-${id}`} class={`page-context ${mediaClass}`}>
	{#if aside}
		<Reveal
			id="context"
			element="aside"
			auto={true}
			reveal={app?.reveal || ''}
			title="On this Page"
			position={false}
			place="left"
			color="primary"
			justify="evenly"
			font="sm"
			size="sm"
			variant="outline"
			breakpoint="xs"
			formaction="toggleContext"
			dismiss="outside"
		>
			<div class="l:stack:2xs">
				{@render aside()}
			</div>
		</Reveal>
	{/if}
</div>

<div class="main-footer">
	{#if footer}
		{@render footer()}
	{/if}
</div>
