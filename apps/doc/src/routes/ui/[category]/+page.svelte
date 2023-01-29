<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'
	const {Collection} = api

	$: category = $page.params.category
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = category === 'blocks' ? blocks : layouts
	$: path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<section class="l:stack">
	<Collection {title} depth="1" isPage={true} {components} {path} {category} />
</section>
