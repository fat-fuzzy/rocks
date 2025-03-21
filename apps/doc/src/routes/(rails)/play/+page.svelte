<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	// let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []).filter((tag)=> tag !== 'webgl' && tag !== 'webglfundamentals'))
</script>

<PageRails
	{title}
	{description}
	size="sm"
	path={$page.url.pathname}
	nav={$page.data.nav}
	context={$page.data.context}
	layout=""
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="md" margin="auto" />
		<div class="l:text:md maki:auto">
			<Footer />
		</div>
	{/snippet}
	{#snippet aside()}
		<p class="feedback">Some Context</p>
	{/snippet}
</PageRails>
