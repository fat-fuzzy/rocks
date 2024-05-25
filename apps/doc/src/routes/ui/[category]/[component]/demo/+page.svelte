<script lang="ts">
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import {
		headless,
		tokens,
		blocks,
		layouts,
		recipes,
		constants,
	} from '@fat-fuzzy/ui-s5'
	import {api, stores} from '@fat-fuzzy/playbook'

	const {Head} = headless
	const {Element, Api} = api
	const actionPath = '/ui'
	const {DEFAULT_TABS} = constants

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
	}

	let currentTabs = stores.ui.currentTabs
	let currentTab = $currentTabs.ui || DEFAULT_TABS[0]

	const localStores = [
		stores.ui.currentTabs.subscribe((value) => {
			if (value) {
				currentTab = value.ui
			}
		}),
	]

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
	let headerClass = `l:grid:header:${currentTab.value} bp:xs bg:polar`

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="main">{title} | Demo</h1>

	<div class="context">
		<Api
			categories={['app']}
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
