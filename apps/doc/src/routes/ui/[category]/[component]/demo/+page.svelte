<script lang="ts">
	import {page} from '$app/stores'

	import {headless, tokens, blocks, layouts, recipes} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

	const {Head} = headless
	const {Element, Api} = api
	const actionPath = '/ui'

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
	}

	let category = $state($page.params.category)
	let title = $state($page.params.component)
	let Component = categoryItems[category][title]
	let path = $page.url.pathname
	let markdowns =
		$page.data.markdowns && $page.data.markdowns[category]
			? $page.data.markdowns[category]
			: []
	let content = markdowns.find(({meta}) => meta.title === title) || {
		html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
	}
	let headerClass = `l:grid:header:demo bp:xs bg:polar`
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="l:main">{title} | Demo</h1>

	<div class="context l:side">
		<Api
			categories={['app']}
			meta={content.meta}
			{path}
			{actionPath}
			redirect={$page.url.pathname}
		/>
	</div>
</header>

<Element
	isPage={true}
	depth={1}
	{title}
	{path}
	{category}
	component={Component}
	meta={content.meta}
	{actionPath}
	redirect={$page.url.pathname}
/>
