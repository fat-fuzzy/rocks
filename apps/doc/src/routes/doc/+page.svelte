<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdown = $page.data.content
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let date = $derived(markdown.meta.date)
	let html = $derived(markdown.html)
</script>

<PageMain {title} {description} size="md">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
		<div class="l:main:50 l:flex justify:end">
			<p class="feedback:prose status:default variant:bare card:sm">
				Published: {date}
			</p>
		</div>
	{/snippet}
	<article class="l:sidebar:md">
		<div class="l:text:lg">{@html html}</div>
	</article>
</PageMain>
