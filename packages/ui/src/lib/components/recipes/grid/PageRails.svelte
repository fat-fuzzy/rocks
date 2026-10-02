<script lang="ts">
	import type {UiSize, PageRailsProps, UiLayout} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import PageNav from '$lib/components/recipes/navs/PageNav.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'

	let {
		id = 'main',
		title = 'PageRails',
		prefix,
		path = '',
		hash,
		description = `Rails layout (zones 1-5)`,
		pageName,
		text, // Text size for main content & header
		dimensions,
		justify,
		main,
		nav,
		aside,
		details,
		footer,
		useHeader = true,
		layout = 'metro',
		headerLayout,
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)

	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')

	const zoneMainClasses: {[key: string]: string} = {
		metro: 'l:grid size:3xs scroll:y color:neutral align:start',
		railway: 'l:grid size:3xs scroll:y color:neutral align:start',
		steam: 'l:grid size:3xs scroll:y color:neutral align:start align:start',
		tgv: 'snap:center align:start',
		tram: 'l:grid snap:start size:3xs scroll:y color:neutral align:start',
		voyager: 'l:grid snap:start size:3xs scroll:y color:neutral align:start ',
		urbanist: 'snap:start l:grid size:3xs scroll:y color:neutral',
	}

	const pageMainClasses: {[key: string]: string} = {
		metro: 'align:start',
		railway: 'align:start',
		steam: 'l:flex justify:center align:start',
		tgv: '',
		tram: 'l:grid size:3xs align:start',
		voyager: 'l:flex:lg align:start size:lg font:md',
		urbanist: 'l:flex align:start',
	}

	const contextClasses: {[key: string]: string} = {
		metro: 'l:stack:2xs',
		railway: 'l:stack:2xs',
		steam: 'l:grid size:3xs ',
		tgv: '',
		tram: 'l:grid size:3xs',
		voyager: 'l:stack:2xs',
		urbanist: 'l:stack:2xs',
	}

	const contextInnerClasses: {[key: string]: string} = {
		metro: '',
		railway: '',
		steam: 'ff:callout magic:feather shape:soft',
		tgv: '',
		tram: 'ff:callout shape:soft',
		voyager: '',
		urbanist: '',
	}

	let contextClass = $derived(
		nav?.length || aside ? `${contextClasses[layout]}` : 'empty',
	)
	let contextInnerClass = $derived(
		nav?.length || aside ? `${contextInnerClasses[layout]}` : '',
	)
	let zoneMainClass = $derived(zoneMainClasses[layout])
	let pageMainClass = $derived(pageMainClasses[layout])
	let hLayout = $derived(headerLayout || details ? 'sidebar' : '')
</script>

<Head pageName={currentPage} {title} {description} {prefix} />

<main {id} class={`zone:main ${layout} ${zoneMainClass}`}>
	{#if layout === 'tgv'}
		{#if useHeader}
			<PageHeader {title} text={text as UiSize} layout="center" />
		{/if}
	{:else}
		<PageHeader
			{title}
			text={text as UiSize}
			{justify}
			layout={hLayout as UiLayout}
			side={details}
		>
			{#snippet main()}
				<Breadcrumbs
					id={`${id}-header-content`}
					{title}
					{path}
					level={1}
					size="2xs"
				/>
			{/snippet}
		</PageHeader>
	{/if}

	<div class={`page-main ${pageMainClass}`}>
		{@render main()}
		{#if footer}
			{@render footer()}
		{/if}
	</div>
</main>

{#if layout !== 'tgv'}
	<aside
		id={`context-${id}`}
		class={`page-context ${contextClass} ${mediaClass} scroll:y color:neutral`}
	>
		{#if nav && nav.length > 0}
			<PageNav id="page-nav" {hash} items={nav} />
		{/if}
		<div class={`l:stack:md ${contextInnerClass}`}>
			{#if aside}
				{@render aside()}
			{/if}
		</div>
	</aside>
{/if}
