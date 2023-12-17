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
	<title>Fat Fuzzy UI | {title}</title>
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
		<div slot="content" class="l:side maki sm feedback default bare emoji:idea">
			<p>Published: {date}</p>
		</div>
	</RevealAuto>
</header>

<article class="card:md">
	<div class="l:text:lg">{@html html}</div>
</article>
