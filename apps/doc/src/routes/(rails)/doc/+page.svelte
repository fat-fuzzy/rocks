<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {Sidebar} = ui.layouts
	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let pageContext = $derived({...page.data.pageContext, title: 'On this Page'})
	let images = $derived(page.data.images)
	let brightness = $derived(pageContext.brightness)
	let markdown = $derived(page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let media = $derived(brightness ? images[brightness] : images['day'])
</script>

<PageRails
	{title}
	{description}
	size="sm"
	dimensions="twin"
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="voyager"
>
	{#snippet main()}
		<Sidebar dimension={50} size="2xl" reverse={true} wrap="reverse">
			{#snippet main()}
				<EscapeHtml id={slug} {html} size="md" margin="auto" />
			{/snippet}
			{#snippet side()}
				<Picture {...media} />
			{/snippet}
		</Sidebar>
	{/snippet}
</PageRails>
