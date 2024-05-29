<script lang="ts">
	import {page} from '$app/stores'

	import {
		tokens,
		blocks,
		layouts,
		recipes,
		content,
	} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

	const {PageMain} = content
	const {Element, Api} = api
	const actionPath = '/ui'

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
	}

	let category = $derived($page.params.category)
	let path = $derived($page.url.pathname)
	let title = $derived($page.params.component)
	let description = $derived(`${title} | Demo`)
	let Component = $derived(categoryItems[category][title])
	let markdowns = $derived(
		$page.data.markdowns && $page.data.markdowns[category]
			? $page.data.markdowns[category]
			: [],
	)
	let markdownContent = $derived(
		markdowns.find(({meta}) => meta.title === title) || {
			html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
		},
	)
</script>

<PageMain {title} {description}>
	{#snippet header()}
		<h1 class="l:main">{title} | Demo</h1>

		<div class="context l:side">
			<Api
				categories={['app']}
				meta={markdownContent.meta}
				{path}
				{actionPath}
				redirect={$page.url.pathname}
			/>
		</div>
	{/snippet}

	<Element
		isPage={true}
		depth={1}
		{title}
		{path}
		{category}
		component={Component}
		meta={markdownContent.meta}
		{actionPath}
		redirect={$page.url.pathname}
	/>
</PageMain>
