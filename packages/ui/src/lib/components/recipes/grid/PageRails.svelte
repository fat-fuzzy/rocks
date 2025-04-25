<script lang="ts">
	import type {UiSize, PageRailsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'

	let {
		id = 'main',
		title = 'PageRails',
		path = '',
		hash,
		description = `Metro layout (zones 1-4)`,
		pageName,
		size,
		dimensions,
		justify,
		main,
		nav,
		aside,
		footer,
		context,
		layout = 'metro',
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)

	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')

	let header = $derived({
		title,
		main: headerMain,
		layout: 'flex',
	})

	const zones: {[key: string]: string} = {
		metro: 'm-zone',
		railway: 'r-zone',
		steam: 's-zone',
		tgv: 'v-zone',
		tram: 't-zone',
	}

	const mainClasses: {[key: string]: string} = {
		metro: '',
		railway: '',
		steam: 'l:flex justify:center',
		tgv: '',
		tram: '',
	}

	const contextClasses: {[key: string]: string} = {
		metro: 'layer:1 ravioli:md',
		railway: 'layer:1 ravioli:md',
		steam: 'layer:1 ravioli:md',
		tgv: '',
		tram: 'layer:1 ravioli:md',
	}

	let zoneId = $derived(zones[layout] ?? 'zone')
	let contextClass = $derived(
		nav?.length || aside ? `page-context ${contextClasses[layout]}` : 'empty',
	)
	let mainClass = $derived(mainClasses[layout])
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}

<main {id} class={`l:grid ${zoneId}:main scroll:y`}>
	<div class="page-header">
		<PageHeader {...header} size={size as UiSize} {justify} />
	</div>

	<div class={`page-main ${mainClass}`}>
		{@render main()}

		{#if footer}
			{@render footer()}
		{/if}
	</div>
</main>

<div
	id={`context-${id}`}
	class={`l:grid ${contextClass} scroll:y ${mediaClass}`}
>
	{#if nav && nav.length > 0}
		<PageNav id="page-nav" {hash} items={nav} />
	{/if}
	{#if aside}
		{@render aside()}
	{/if}
</div>
