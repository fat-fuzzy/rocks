<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {Image} = ui.drafts
	const {EscapeHtml} = ui.headless

	let markdown = $derived(page.data.content)
	let appContext = $derived(page.data.appContext)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let image = $derived(page.data.image)
</script>

<PageRails
	{title}
	{description}
	size="md"
	path={page.url.pathname}
	nav={page.data.nav}
	app={appContext}
	layout="steam"
>
	{#snippet main()}
		{#if image}
			<div class="splash maki:block size:lg">
				<Image {...image} />
			</div>
		{/if}
		<EscapeHtml id={slug} {html} size="xl" />
	{/snippet}
</PageRails>
