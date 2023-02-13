<script lang="ts">
	import {page} from '$app/stores'

	let title: string
	let date: string
	$: log = $page.data.logs.find((d) => d.path === $page.data.path)
	$: title = log.meta.title
	$: date = log.meta.date
	$: html = $page.data.html
</script>

<svelte:head>
	<title>Fat Fuzzy UI | {title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<article class="l:text:md">
	<h1>{title}</h1>
	<p>Published: {date}</p>
	{@html html}
</article>
