<script lang="ts">
	import {page} from '$app/stores'
	import {headless} from '@fat-fuzzy/ui'

	const {Head} = headless

	let title: string
	let date: string
	$: markdown = $page.data.markdowns.find((d) => d.path === $page.data.path)
	$: title = markdown.meta.title
	$: date = markdown.meta.date
	$: html = $page.data.html
	$: headerClass = 'l:grid:header bp:xs bg:polar'

	// TODO: Fix context menu
</script>

<Head {title} page="Log" description={`Decision Log ${markdown.meta.id}: ${title}`} />

<header class={headerClass}>
	<h1 class="main card:sm">{title}</h1>

	<div class="tabs card:md">
		<p class="feedback bare sm">Published: {date}</p>
	</div>
</header>

<article class="card:md">
	<div class="l:text:lg">{@html html}</div>
</article>
