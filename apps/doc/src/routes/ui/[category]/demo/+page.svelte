<script lang="ts">
	import {page} from '$app/stores'

	import {headless, tokens, blocks, layouts, recipes} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

	const {Head} = headless
	const {Collection, Api} = api

	const actionPath = '/ui'

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
	]

	let category = $state($page.params.category)
	let markdowns = $state($page.data.markdowns)
	let meta = $derived(
		markdowns.categories.find(({meta}) => meta.slug === category).meta,
	)
	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let path = $page.url.pathname
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let headerClass = `l:grid:header:doc bp:xs bg:polar`
</script>

<Head {title} page={title} description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="l:main">{title}</h1>
	<div class="context l:side">
		<Api
			categories={['app']}
			{meta}
			{path}
			{actionPath}
			redirect={$page.url.pathname}
		/>
	</div>
</header>
<Collection
	depth={1}
	isPage={true}
	components={items}
	{meta}
	{path}
	{category}
	{markdowns}
	{actionPath}
	redirect={$page.url.pathname}
>
	{@html markdowns.categories.find(({meta}) => meta.slug === category).html}
</Collection>
