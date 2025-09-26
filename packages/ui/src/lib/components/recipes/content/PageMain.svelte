<script lang="ts">
	import type {UiSize, PageProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'

	let {
		id = 'main',
		title = 'PageMain',
		description = `Basic page layout`,
		pageName,
		text,
		layout = 'sidebar',
		justify,
		header,
		children,
	}: PageProps = $props()

	let currentPage = $state(pageName ?? title)
</script>

<Head pageName={currentPage} {title} {description} />

<main {id} class={`l:${layout}`}>
	<PageHeader {title} text={text as UiSize} {layout} {justify} {...header} />

	{#if children}
		{@render children()}
	{/if}
</main>
