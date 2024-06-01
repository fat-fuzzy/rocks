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

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
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

<PageMain {title} {description} size="md">
	{#snippet header()}
		<h1 class="l:main:60">{title}</h1>
		<div class="l:side l:flex justify:end">
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
