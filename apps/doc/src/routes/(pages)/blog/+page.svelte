<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	let post = $derived(page.data.content)
	let title = $derived(post.meta.title)
	let description = $derived(post.meta.description)
	let html = $derived(post.html)
	let slug = $derived(post.meta.slug)
</script>

<PageMain {title} {description} size="md">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<article class="l:sidebar:md">
		<EscapeHtml id={slug} {html} size="md" />
	</article>
</PageMain>
