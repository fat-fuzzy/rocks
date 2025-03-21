<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails, Aside} = ui.content
	const {EscapeHtml} = ui.headless

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
		context={page.data.context}
		layout=""
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
		{#snippet footer()}
			<Footer />
		{/snippet}
	</PageRails>
{/key}
