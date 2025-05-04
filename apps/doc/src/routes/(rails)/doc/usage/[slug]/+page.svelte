<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails, Aside} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
	let markdown = $derived(
		page.data.markdowns.usages.find((d) => d.path === page.data.html.path),
	)
	let title = $derived(markdown.meta.title)
	let description = $derived(`Developer Doc ${markdown.meta.id}: ${title}`)
	// let updated = $derived(markdown.meta.date_created) TODO
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
</script>

{#key title}
	<PageRails
		pageName="Usage"
		{title}
		{description}
		size="sm"
		path={page.url.pathname}
		nav={page.data.nav}
		app={appContext}
		layout={page.data.sidebar.layout}
	>
		{#snippet main()}
			<EscapeHtml id={slug} {html} size="md" margin="auto" />
		{/snippet}
		{#snippet aside()}
			<Aside
				created={markdown.meta.date_created}
				updated={markdown.meta.date_updated}
			/>
		{/snippet}
	</PageRails>
{/key}
