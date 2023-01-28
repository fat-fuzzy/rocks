<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, api} from '@fat-fuzzy/ui'
	const {Collection} = api

	let title = 'Fat Fuzzy UI' // TODO : Fix title: add breadcrumb nav component ?
	const components = blocks
	let category = 'blocks' // TODO: fix content
	let path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<section class="l-stack">
	<Collection
		{title}
		depth="1"
		isPage={true}
		path={`${path}/${category}`}
		{components}
		{category}
	/>
</section>
