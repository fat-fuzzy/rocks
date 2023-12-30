<script lang="ts">
	import {page} from '$app/stores'
	import {headless, tokens, blocks, layouts, recipes, graphics, api} from '@fat-fuzzy/ui'

	const {Head} = headless
	const {Collection} = api

	const actionPath = '/ui'
	const title = 'UI'
	const description = `${title} Doc`

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
	$: headerClass = 'l:flex card:sm bg:polar align:center'
</script>

<Head page={title} {description} />

<header class={headerClass}>
	<h1 class="card:md">Fat Fuzzy {title}</h1>
</header>

<section class="card:md scroll:y">
	<div class="l:text:lg snap:start">{@html content.html}</div>
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
