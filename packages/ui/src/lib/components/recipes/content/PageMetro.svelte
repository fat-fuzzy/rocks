<script lang="ts">
	import type {UiSize, PageRailsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
	import Reveal from '$lib/components/layouts/Reveal/Reveal.svelte'

	let {
		id = 'main',
		title = 'PageMetro',
		path = '',
		hash,
		description = `Metro page layout with header areas, main content and placeable context areas`,
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
	})
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}

<main {id} class="page-main">
	<PageHeader size={size as UiSize} layout="flex" {justify} {...header} />
	{@render main()}
	{#if footer}
		{@render footer()}
	{/if}
</main>

<div id={`context-${id}`} class={`page-context ${mediaClass}`}>
	{#if nav.length > 0 || aside}
		<Reveal
			id="context"
			element="aside"
			auto={true}
			reveal={context?.reveal || ''}
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
				{#if nav.length > 0}
					<PageNav id="page-nav" {hash} items={nav} />
				{/if}
				{#if aside}
					{@render aside()}
				{/if}
			</div>
		</Reveal>
	{/if}
</div>
