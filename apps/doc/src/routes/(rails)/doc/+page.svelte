<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let images = $derived(page.data.images)
	let brightness = $derived(page.data.settings.brightness)
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
	context={page.data.context}
	dimensions="twin"
	layout=""
>
	{#snippet main()}
		<div class="w:full ravioli:md">
			<EscapeHtml id={slug} {html} size="md" margin="auto" />
		</div>
		<Footer />
	{/snippet}
	{#snippet aside()}
		<div class="l:taco">
			<Picture {...media} dimensions="full" />
		</div>
	{/snippet}
</PageRails>
