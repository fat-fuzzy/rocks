<script lang="ts">
	import {page} from '$app/stores'
	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless

	let markdown = $page.data.markdowns.find((d) => d.path === $page.data.path)
	let title = markdown.meta.title
	let date = markdown.meta.date
	let html = $page.data.html
	let headerClass = 'l:switcher:xs card:sm align:center bg:polar'

	// TODO: Fix context menu
</script>

<Head
	{title}
	page="Dev"
	description={`Developer Doc ${markdown.meta.id}: ${title}`}
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
