<script lang="ts">
	import {page} from '$app/stores'
	import {tokens, blocks, layouts, recipes, content} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

	const {PageMain} = content
	const {Collection, Api} = api

	const actionPath = '/ui'

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
	]

	let category = $derived($page.params.category)
	let markdowns = $derived($page.data.markdowns)
	let meta = $derived(
		markdowns.categories.find(({meta}) => meta.slug === category).meta,
	)
	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let path = $derived($page.url.pathname)
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Demo`)
</script>

<PageMain {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:main:60">{title}</h1>
		<div class="l:side l:flex justify:end">
			<Api
				categories={['app']}
				{meta}
				{path}
				{actionPath}
				redirect={$page.url.pathname}
			/>
		</div>
	{/snippet}

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
</PageMain>
