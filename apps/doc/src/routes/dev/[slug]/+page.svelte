<script lang="ts">
	import {page} from '$app/stores'
	import {headless, layouts} from '@fat-fuzzy/ui'

	const {Head} = headless
	const {RevealAuto} = layouts

	let title: string
	let date: string
	$: markdown = $page.data.markdowns.find((d) => d.path === $page.data.path)
	$: title = markdown.meta.title
	$: date = markdown.meta.date
	$: html = $page.data.html
	$: headerClass = 'page-header card:xs bg:polar'

	// TODO: Fix context menu
</script>

<Head {title} page="Dev" description={`Developer Doc ${markdown.meta.id}: ${title}`} />

<header class={headerClass}>
	<h1 class="card:lg">{title}</h1>

	<RevealAuto
		size="sm"
		breakpoint="sm"
		color="primary:light"
		align="start"
		title="Info"
		formaction="toggleContext"
		actionPath="/ui"
		redirect={$page.url.pathname}
	>
		<div slot="content" class="l:side maki sm feedback default bare emoji:idea">
			<p>Published: {date}</p>
		</div>
	</RevealAuto>
</header>

<article class="card:md">
	<div class="l:text:lg">{@html html}</div>
</article>
