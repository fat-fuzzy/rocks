<script lang="ts">
	import {page} from '$app/stores'
	import {onDestroy} from 'svelte'

	import {tokens, blocks, layouts, compositions, api, stores} from '$lib'

	const {Collection, Api} = api
	const {Sidebar, RevealAuto} = layouts

	let stylesApi = api.stylesApi.initStyles()

	let title = 'Fat Fuzzy UI' // TODO : Fix title: add breadcrumb nav component ?

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'compositions', items: compositions},
	]
	let path = $page.url.pathname

	const localStores = [
		stores.ui.styles.subscribe((value) => {
			if (value) {
				stylesApi.applyStyles(value)
			}
		}),
	]

	$: markdowns = $page.data.markdowns
	$: content = markdowns.categories.find(({meta}) => meta.slug === 'ui')
	$: headerClass = 'page-header l:switcher:xs bp:xxs bg:polar'
	// TODO: load text content to README.md

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class={headerClass}>
	<h1 class="l:main:40 card:xl">{title}</h1>
	<RevealAuto
		size="sm"
		threshold="sm"
		color="primary:light"
		align="start"
		asset="&nbsp;☂️&nbsp;"
		title="Context"
	>
		<div slot="content" class="l:side shrink ui:menu">
			<Api {title} {path} />
		</div>
	</RevealAuto>
</header>

<Sidebar size="xs" align="end">
	<div slot="main" class="l:stack">
		<div class="l:text:xl">
			<div class="card:xl">{@html content.html}</div>
		</div>
		{#each components as { category, items }}
			<Collection
				{title}
				depth={1}
				isPage={false}
				path={`${path}/${category}`}
				components={items}
				{category}
				{stylesApi}
				content={markdowns.categories.find(({meta}) => meta.slug === category)}
			/>
		{/each}
	</div>
</Sidebar>
