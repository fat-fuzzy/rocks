<script lang="ts">
	import {page} from '$app/stores'
	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless

	let title: string
	let date: string
	$: markdown = $page.data.markdowns.find((d) => d.path === $page.data.path)
	$: title = markdown.meta.title
	$: date = markdown.meta.date
	$: html = $page.data.html
	$: headerClass = 'l:switcher:xs card:sm align:center bg:polar'

	// TODO: Fix context menu
</script>

<Head
	{title}
	page="Log"
	description={`Decision Log ${markdown.meta.id}: ${title}`}
/>

<header class={headerClass}>
	<h1 class="l:main:80 card:md">{title}</h1>

	<div class="context end card:md">
		<p class="feedback bare sm">Published: {date}</p>
	</div>
</header>

<article class="card:md">
	<div class="l:text:lg">{@html html}</div>
</article>
