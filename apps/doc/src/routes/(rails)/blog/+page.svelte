<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
	let post = $derived(page.data.content)
	let title = $derived(post.meta.title)
	let description = $derived(post.meta.description)
	let html = $derived(post.html)
	let slug = $derived(post.meta.slug)
</script>

<PageRails
	{title}
	{description}
	size="sm"
	path={page.url.pathname}
	nav={page.data.nav}
	app={appContext}
	layout="metro"
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="xl" />
	{/snippet}
</PageRails>
