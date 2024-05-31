<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdown = $derived(
		$page.data.markdowns.find((d) => d.path === $page.data.path),
	)
	let title = $derived(markdown.meta.title)
	let description = `Decision Log ${markdown.meta.id}: ${title}`
	let date = $derived(markdown.meta.date)
	let html = $derived($page.data.html)
</script>

<PageMain page="Log" {title} {description}>
	{#snippet header()}
		<h1 class="card:md">{title}</h1>
		<div class="l:side l:flex justify:end">
			<p class="feedback bare sm">Published: {date}</p>
		</div>
	{/snippet}
	<article class="card:md">
		<div class="l:text:lg">{@html html}</div>
	</article>
</PageMain>
