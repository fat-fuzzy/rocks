<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

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
	context={page.data.context}
	layout=""
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="md" margin="auto" />
		<div class="l:text:md maki:auto">
			<Footer />
		</div>
	{/snippet}
</PageRails>
