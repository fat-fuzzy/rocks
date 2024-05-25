<script lang="ts">
	import {page} from '$app/stores'
	import {headless, tokens, blocks, layouts, recipes} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

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
	]
	const path = $page.url.pathname
	let markdowns = $derived($page.data.markdowns)
	let content = markdowns.categories.find(({meta}) => meta.slug === 'ui')
	let headerClass = 'l:flex card:sm bg:polar align:center'
</script>

<Head page={title} {description} />

<header class={headerClass}>
	<h1 class="card:md">Fat Fuzzy {title}</h1>
</header>

<section class="card:md scroll:y">
	<div class="l:text:lg snap:start">{@html content.html}</div>
	{#each components as { category, items }}
		{@const meta = markdowns.categories.find(
			({meta}) => meta.slug === category,
		).meta}
		<Collection
			depth={1}
			isPage={false}
			path={`${path}/${category}`}
			components={items}
			{meta}
			{category}
			{markdowns}
			{actionPath}
		>
			{@html markdowns.categories.find(({meta}) => meta.slug === category).html}
		</Collection>
	{/each}
</section>
