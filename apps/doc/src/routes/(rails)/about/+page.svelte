<script lang="ts">
	import {page} from '$app/state'
	import {Sidebar, PageRails, EscapeHtml, Picture} from '@fat-fuzzy/ui'

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
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
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="voyager"
>
	{#snippet main()}
		<Sidebar dimensions="50" size="2xl" reverse={true}>
			{#snippet side()}
				<div class="l:text:xl">
					<Picture {...media} />
				</div>
			{/snippet}
			{#snippet main()}
				<EscapeHtml id={slug} {html} size="xl" />
			{/snippet}
		</Sidebar>
	{/snippet}
</PageRails>
