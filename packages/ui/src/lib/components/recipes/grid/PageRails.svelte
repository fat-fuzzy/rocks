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
		context, // TODO: This should be the page context's expanded state
		layout = 'metro',
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)

	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')

	let header = $derived({
		title,
		main: headerMain,
		layout: 'flex',
	})

	const zoneMainClasses: {[key: string]: string} = {
		metro: 'l:grid size:3xs scroll:y align:start bg:inherit',
		railway: 'l:grid size:3xs scroll:y align:start bg:inherit',
		steam:
			'l:grid size:3xs scroll:y align:start justify:center align:start bg:inherit',
		tgv: 'snap:center align:start scroll:container bg:inherit',
		tram: 'l:grid snap:start size:3xs scroll:y align:start bg:inherit',
		voyager: 'l:grid snap:start size:3xs scroll:y align:start bg:inherit',
		urbanist: 'snap:start l:grid size:3xs scroll:y bg:inherit',
	}

	const pageMainClasses: {[key: string]: string} = {
		metro: 'align:start',
		railway: 'align:start',
		steam: 'l:flex justify:center align:start',
		tgv: '',
		tram: 'l:grid size:3xs align:start',
		voyager: 'l:flex align:start',
		urbanist: 'l:flex align:start',
	}

	const contextClasses: {[key: string]: string} = {
		metro: 'ravioli:3xs',
		railway: 'ravioli:3xs',
		steam: 'layer:1 ravioli:3xs',
		tgv: '',
		tram: 'ravioli:3xs layer:1',
		voyager: '',
		urbanist: '',
	}

	let contextClass = $derived(
		nav?.length || aside
			? `page-context ${contextClasses[layout]}`
			: 'page-context empty',
	)
	let zoneMainClass = $derived(zoneMainClasses[layout])
	let pageMainClass = $derived(pageMainClasses[layout])
	let headerLayout = $derived(
		layout === 'steam' || layout === 'tram' || layout === 'voyager'
			? 'sidebar'
			: '',
	)
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}

<main {id} class={`zone:main ${layout} ${zoneMainClass}`}>
	{#if layout === 'tgv'}
		<!--Do nothing: title is displayed in Scrolly /-->
		<!--PageHeader {title} size={size as UiSize} {justify} layout="center" /-->
	{:else}
		<PageHeader
			{...header}
			size={size as UiSize}
			{justify}
			layout={headerLayout}
		/>
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
	class={`${contextClass} l:stack:${size} bg:inherit scroll:y ${mediaClass}`}
>
	{#if nav && nav.length > 0}
		<PageNav id="page-nav" {hash} items={nav} />
	{/if}
	{#if aside}
		{@render aside()}
	{/if}
</div>
