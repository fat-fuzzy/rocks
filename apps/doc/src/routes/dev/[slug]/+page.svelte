<script lang="ts">
	import {page} from '$app/stores'

	let title: string
	let date: string
	$: markdown = $page.data.markdowns.find((d) => d.path === $page.data.path)
	$: title = markdown.meta.title
	$: date = markdown.meta.date
	$: html = $page.data.html
</script>

<svelte:head>
	<title>Fat Fuzzy UI | {title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<article class="l:text:lg">
	<h1>{title}</h1>
	<p>Published: {date}</p>
	{@html html}
</article>
