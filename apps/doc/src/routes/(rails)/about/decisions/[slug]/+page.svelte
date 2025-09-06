<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails, PageContext} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
	let markdown = $derived(
		page.data.markdowns.decisions.find((d) => d.path === page.data.html.path),
	)
	let title = $derived(markdown.meta.title)
	let description = $derived(`Decision Log ${markdown.meta.id}: ${title}`)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
</script>

{#key title}
	<PageRails
		pageName="Decisions"
		{title}
		{description}
		size="sm"
		path={page.url.pathname}
		nav={page.data.nav}
		app={appContext}
		layout={page.data.layout}
	>
		{#snippet main()}
			<EscapeHtml id={slug} {html} size="md" />
		{/snippet}
		{#snippet aside()}
			<PageContext
				created={markdown.meta.date_created}
				updated={markdown.meta.date_updated}
			/>
		{/snippet}
	</PageRails>
{/key}
