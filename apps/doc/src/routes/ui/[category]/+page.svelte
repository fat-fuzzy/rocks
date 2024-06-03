<script lang="ts">
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'
	import {tokens, blocks, layouts, recipes, content, constants} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'
	import appStore from '../../stores.svelte.js'

	const {PageMain} = content
	const {Collection, Api} = api
	const {ToggleMenu} = recipes
	const {DEFAULT_TABS, TABS} = constants

	const actionPath = '/ui'
	const tabs = TABS

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
	]
	let currentTabs = appStore.currentTabs
	let currentTab = $state(currentTabs.ui || DEFAULT_TABS[0])

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
	let markdowns = $derived($page.data.markdowns)
	let meta = $derived(
		markdowns.categories.find(({meta}) => meta.slug === category).meta,
	)
	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let markdownContent = $derived(markdowns[category].find(({meta}) => meta.slug === category))
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)

	function handleTabChange(selected: { name: string; value: string|number; state: string; }[]) {
		if(selected.length === 0) {
			return
		}
		currentTab = {...selected[0], value: String(selected[0].value),title: selected[0].name, id: selected[0].name}
	}
</script>

<PageMain {title} {description} size="xl">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
		<div class="l:main:50 l:flex justify:end">

			{#if currentTab.value === 'demo'}
				<Api
					categories={['app']}
					{meta}
					{path}
					{actionPath}
					redirect={$page.url.pathname}
				/>
			{/if}

			<form
				method="POST"
				class="tabs flex nowrap"
				action={`/ui?/updateTab&redirectTo=${$page.url.pathname}`}
				use:enhance={() => {
					// prevent default callback from resetting the form
					return ({update}) => {
						update({reset: false})
					}
				}}
			>
				<ToggleMenu
					id={`submit.${path}`}
					items={tabs.map((tab) => {
						if (tab.value == currentTab.value) {
							tab.initial = 'active'
						}
						return tab
					})}
					size="md"
					layout="flex nowrap"
					container="card:md"
					color="primary"
					shape="round"
					variant="outline"
					formaction={`/ui?/updateTab&redirectTo=${path}`}
					onupdate={handleTabChange}
					init={handleTabChange}
				/>
			</form>
		</div>
	{/snippet}

	{#if markdownContent.html && currentTab.value === 'doc'}
	<article class="l:sidebar:md">
		<section class="l:main">
			<div class="l:text:lg">{@html markdownContent.html}</div>
		</section>
		<aside class="l:side l:stack:sm">
			{#if !markdownContent.meta}
				<p class="feedback bare emoji:default">Coming Soon!</p>
			{:else if markdownContent.meta.props_style}
				<details open>
					<summary class="bg:primary:100">Style Props</summary>
					<ul class="tags l:switcher:md">
						{#each markdownContent.meta.props_style as prop}
							<li class="ccard:xs font:sm bg:primary:000">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</aside>
	</article>
{:else if currentTab.value === 'demo'}
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
	{/if}
</PageMain>
