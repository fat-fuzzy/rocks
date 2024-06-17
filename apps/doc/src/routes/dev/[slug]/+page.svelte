<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {PageMain} = content

	let appSettings = $derived(fatFuzzyStore.app)
	let markdown = $derived(
		$page.data.markdowns.find((d) => d.path === $page.data.path),
	)
	let title = $derived(markdown.meta.title)
	let description = $derived(`Developer Doc ${markdown.meta.id}: ${title}`)
	let date = $derived(markdown.meta.date)
	let html = $derived($page.data.html)
</script>

<PageMain page="Dev" {title} {description} app={{settings: appSettings}}>
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
