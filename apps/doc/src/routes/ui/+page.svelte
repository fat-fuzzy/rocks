<script lang="ts">
	import type {PageData} from './$types'
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'

	export let data: PageData

	let uiState: any

	const {Collection, Api} = api
	const {Sidebar} = layouts

	let title = 'Fat Fuzzy UI' // TODO : Fix title: add breadcrumb nav component ?

	const components = [
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
	]
	let path = $page.url.pathname

	$: {
		uiState = data.uiState
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Sidebar size="xs" align="end">
	<main slot="main">
		{#each components as { category, items }}
			<Collection
				{title}
				depth="1"
				isPage={false}
				path={`${path}/${category}`}
				components={items}
				{category}
			/>
		{/each}
	</main>

	<aside slot="side">
		<Api {title} category="app" {uiState} />
	</aside>
</Sidebar>
