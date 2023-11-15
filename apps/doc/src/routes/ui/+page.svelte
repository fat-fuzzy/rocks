<script lang="ts">
	import {page} from '$app/stores'
	import {tokens, blocks, layouts, compositions, api} from '@fat-fuzzy/ui'

	const {Collection, Api} = api
	const {Sidebar, RevealAuto} = layouts

	let title = 'Fat Fuzzy UI' // TODO : Fix title: add breadcrumb nav component ?

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'compositions', items: compositions},
	]
	let path = $page.url.pathname

	$: markdowns = $page.data.markdowns
	$: content = markdowns.categories.find(({meta}) => meta.slug === 'ui')
	$: headerClass = 'page-header l:switcher:xs bp:xxs bg:polar'
	// TODO: load text content to README.md
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
			<Api {title} />
		</div>
	</RevealAuto>
</header>

<Sidebar size="xs" align="end">
	<div slot="main" class="l:stack">
		<div class="l:text:xl">
			{@html content.html}
		</div>
		{#each components as { category, items }}
			<Collection
				{title}
				depth={1}
				isPage={false}
				path={`${path}/${category}`}
				components={items}
				{category}
				content={markdowns.categories.find(({meta}) => meta.slug === category)}
			/>
		{/each}
	</div>
</Sidebar>
