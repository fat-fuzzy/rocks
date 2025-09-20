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

	$effect(() => {
		if (slide) {
			html = slide.html
		}
	})
</script>

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
		{#key html}
			<EscapeHtml id={slug} {html} size="xl" />
		{/key}
	{/snippet}
	{#snippet aside()}{/snippet}
</PageRails>
