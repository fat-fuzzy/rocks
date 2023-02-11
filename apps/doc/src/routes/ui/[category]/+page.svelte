<script lang="ts">
	import type {PageData} from './$types'
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'
	const {Collection} = api

	export let data: PageData

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

<Collection {title} depth="1" isPage={true} {components} {path} {category} {data} />
