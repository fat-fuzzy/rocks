<script lang="ts">
	import {page} from '$app/stores'
	import {headless, tokens, blocks, layouts, recipes, graphics, api} from '@fat-fuzzy/ui'

	const {Head} = headless
	const {Collection} = api

	const actionPath = '/ui'
	const title = 'UI' // TODO : Fix title: add breadcrumb nav component ?

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
		{category: 'graphics', items: graphics},
	]
	const path = $page.url.pathname

	$: markdowns = $page.data.markdowns
	$: content = markdowns.categories.find(({meta}) => meta.slug === 'ui')
	$: headerClass = 'page-header l:switcher:xs bp:xxs bg:polar'
</script>

<Head page={title} description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="card:lg">Fat Fuzzy {title}</h1>
</header>

<section class="card:md">
	<div class="l:text:lg">{@html content.html}</div>
	{#each components as { category, items }}
		<Collection
			depth={1}
			isPage={false}
			path={`${path}/${category}`}
			components={items}
			{category}
			content={markdowns.categories.find(({meta}) => meta.slug === category)}
			{markdowns}
			{actionPath}
		/>
	{/each}
</section>
