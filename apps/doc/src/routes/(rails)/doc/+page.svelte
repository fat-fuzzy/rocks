<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let appContext = $derived(page.data.appContext)
	let images = $derived(page.data.images)
	let brightness = $derived(appContext.brightness)
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
	app={appContext}
	dimensions="twin"
	layout="tram"
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="md" margin="auto" />
	{/snippet}
	{#snippet aside()}
		<div class="l:taco:sm">
			<Picture {...media} dimensions="full" />
		</div>
	{/snippet}
	{#snippet footer()}
		<Footer />
	{/snippet}
</PageRails>
