<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	let title = 'Speaking'
	let description = 'Slide decks and notes from talks and workshops'

	let markdown = $derived(page.data.content)
	let appContext = $derived(page.data.appContext)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
</script>

<PageRails
	{title}
	{description}
	size="md"
	path={page.url.pathname}
	nav={page.data.nav}
	app={appContext}
	layout="metro"
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="xl" />
	{/snippet}
</PageRails>
