<script lang="ts">
	import type {PageData, ActionData} from './$types'
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'

	export let data: PageData

	export let form: ActionData

	const {Collection, Api} = api
	const {Sidebar} = layouts

	let title = 'Fat Fuzzy UI' // TODO : Fix title: add breadcrumb nav component ?
	const components = [
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
	]
	let path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Sidebar size="xs" align="end">
	<main slot="main" class="l:stack md">
		{#each components as { category, items }}
			<Collection
				{title}
				depth="1"
				isPage={false}
				path={`${path}/${category}`}
				components={items}
				{category}
				{data}
			/>
		{/each}
	</main>

	<aside slot="side">
		<Api {title} category="app" {data} />
	</aside>
</Sidebar>
