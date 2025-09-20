<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
	let slide = $derived(page.data.content)
	let title = $derived(slide.meta.title)
	let description = $derived(slide.meta.description)
	let html = $derived(slide.html)
	let slug = $derived(slide.slug)
	let series = $derived(
		slide.meta.series
			? slide.meta.series.items.map((id) =>
					page.data.markdowns.find((slide) => slide.meta.id === id),
				)
			: null,
	)
</script>

{#key slide.id}
	<PageRails
		pageName={title}
		{title}
		{description}
		size="sm"
		path={page.url.pathname}
		nav={page.data.nav}
		app={appContext}
		layout="steam"
	>
		{#snippet main()}
			<EscapeHtml id={slug} {html} size="xl" />
		{/snippet}
		{#snippet aside()}{/snippet}
	</PageRails>
{/key}
