<script lang="ts">
	import {page} from '$app/stores'
	import {tokens, blocks, layouts, recipes, content} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {PageMain} = content
	const {Collection} = api

	let appSettings = $derived(fatFuzzyStore.app)

	let actionPath = '/ui'
	let title = 'Fat Fuzzy UI'
	let description = `${title} | Doc`

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
	]
	const path = $derived($page.url.pathname)
	let markdowns = $derived($page.data.markdowns)
	let markdownContent = $derived(
		markdowns.categories.find(({meta}) => meta.slug === 'ui'),
	)
</script>

<PageMain {title} {description} size="md" app={{settings: appSettings}}>
	<article class="l:sidebar:md">
		<section class="l:main">
			<div class="l:text:lg snap:start">{@html markdownContent.html}</div>
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
					{@html markdowns.categories.find(({meta}) => meta.slug === category)
						.html}
				</Collection>
			{/each}
		</section>
	</article>
</PageMain>
