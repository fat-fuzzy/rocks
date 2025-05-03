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
		description = `Rails layout (zones 1-5)`,
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
		tgv: 'g-zone',
		tram: 't-zone',
		voyager: 'v-zone',
	}

	const zoneMainClasses: {[key: string]: string} = {
		metro: 'l:grid size:3xs',
		railway: 'l:grid size:3xs',
		steam: 'l:grid size:3xs',
		tgv: 'snap:center',
		tram: 'snap:start',
		voyager: 'snap:start',
	}

	const pageMainClasses: {[key: string]: string} = {
		metro: '',
		railway: '',
		steam: 'l:flex justify:center',
		tgv: '',
		tram: '',
		voyager: '',
	}

	const contextClasses: {[key: string]: string} = {
		metro: 'layer:1 ravioli:3xs',
		railway: 'layer:1 ravioli:3xs',
		steam: 'layer:1 ravioli:3xs',
		tgv: '',
		tram: 'layer:1 ravioli:3xs',
		voyager: '',
	}

	let zoneId = $derived(zones[layout] ?? 'zone')
	let contextClass = $derived(
		nav?.length || aside
			? `page-context ${contextClasses[layout]}`
			: 'page-context empty',
	)
	let zoneMainClass = $derived(zoneMainClasses[layout])
	let pageMainClass = $derived(pageMainClasses[layout])
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}

<main {id} class={`${zoneId}:main scroll:y ${zoneMainClass}`}>
	{#if layout === 'tgv'}
		<PageHeader {title} size={size as UiSize} {justify} layout="center" />
	{:else if layout === 'voyager'}
		<PageHeader {title} size={size as UiSize} {justify} layout="sidebar">
			{#snippet side()}
				<div></div>
			{/snippet}
		</PageHeader>
	{:else if layout === 'steam'}
		<PageHeader
			{title}
			size={size as UiSize}
			{justify}
			layout="sidebar"
			media={true}
		/>
	{:else}
		<PageHeader {...header} size={size as UiSize} {justify} />
	{/if}

	<div class={`page-main ${pageMainClass}`}>
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
