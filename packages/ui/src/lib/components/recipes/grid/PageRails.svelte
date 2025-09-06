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
		useHeader = true,
		context, // TODO: This should be the page context's expanded state
		layout = 'metro',
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)

	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')

	const zoneMainClasses: {[key: string]: string} = {
		metro: 'l:grid size:3xs scroll:y align:start bg:inherit',
		railway: 'l:grid size:3xs scroll:y align:start bg:inherit',
		steam: 'l:grid size:3xs scroll:y align:start align:start bg:inherit',
		tgv: 'snap:center align:start bg:inherit',
		tram: 'l:grid snap:start size:3xs scroll:y align:start bg:inherit',
		voyager: 'l:grid snap:start size:3xs scroll:y align:start bg:inherit ',
		urbanist: 'snap:start l:grid size:3xs scroll:y bg:inherit',
	}

	const pageMainClasses: {[key: string]: string} = {
		metro: 'align:start',
		railway: 'align:start',
		steam: 'l:flex justify:center align:start',
		tgv: '',
		tram: 'l:grid size:3xs align:start',
		voyager: 'l:flex align:start size:lg',
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
		metro: 'ravioli:3xs bg:inherit',
		railway: 'ravioli:3xs bg:inherit',
		steam: 'ravioli:3xs ff:callout magic:feather shape:soft',
		tgv: '',
		tram: 'ravioli:3xs ff:callout shape:soft',
		voyager: 'bg:inherit',
		urbanist: 'bg:inherit',
	}

	let contextClass = $derived(
		nav?.length || aside ? `${contextClasses[layout]}` : 'empty',
	)
	let contextInnerClass = $derived(
		nav?.length || aside ? `${contextInnerClasses[layout]}` : '',
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

<main {id} class={`zone:main ${layout} ${zoneMainClass}`}>
	{#if layout === 'tgv'}
		{#if useHeader}
			<PageHeader {title} size={size as UiSize} layout="center" />
		{/if}
	{:else}
		<PageHeader {title} size={size as UiSize} {justify} layout={headerLayout}>
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
		class={`page-context ${contextClass} ${mediaClass} scroll:y`}
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
