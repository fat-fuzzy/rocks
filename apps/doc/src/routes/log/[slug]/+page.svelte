<script lang="ts">
	import {page} from '$app/stores'
	import {layouts} from '@fat-fuzzy/ui'

	const {RevealAuto} = layouts

	let title: string
	let date: string
	$: markdown = $page.data.markdowns.find((d) => d.path === $page.data.path)
	$: title = markdown.meta.title
	$: date = markdown.meta.date
	$: html = $page.data.html
	$: headerClass = 'page-header bg:polar'

	// TODO: Fix context menu
</script>

<svelte:head>
	<title>Fat Fuzzy Rocks | {title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class={headerClass}>
	<h1 class="card:xl">{title}</h1>

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
		<div slot="content" class="l:side maki sm feedback bare emoji:info">
			<p>Published: {date}</p>
		</div>
	</RevealAuto>
</header>

<article class="l:text:lg md">
	<div class="card:md">{@html html}</div>
</article>
