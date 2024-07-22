<script lang="ts">
	import {getContext} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'
	import {tokens, blocks, layouts, recipes, content, constants} from '@fat-fuzzy/ui'
	import {api} from '@fat-fuzzy/playbook'
	import PlaybookStore from '$lib/api/store.svelte'

	const {PageMain} = content
	const {Collection, Api} = api
	const {ToggleMenu} = recipes
	const {DEFAULT_TABS, TABS} = constants

	type Props = {
		category: any // TODO: fix types
		markdowns: any
		path: string
		actionPath: string
		redirect: string
	}

	let {category, markdowns, path, actionPath, redirect}: Props = $props()

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')

	const tabs = TABS

	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
	]
	
	let currentTabs = playbookStore.currentTabs
	let currentTab = $state(currentTabs.ui || DEFAULT_TABS[0])

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

<PageMain {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
		<div class="l:main l:flex reverse">
			<form
				method="POST"
				class="tabs maki:inline:lg"
				action={`${actionPath}?/updateTab&redirectTo=${redirect}`}
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
					formaction={`${actionPath}?/updateTab&redirectTo=${path}`}
					onupdate={handleTabChange}
					init={handleTabChange}
				/>
			</form>
			{#if currentTab.value === 'demo'}
				<Api
					categories={['app']}
					meta={markdownContent.meta}
					{path}
					{actionPath}
					redirect={$page.url.pathname}
				/>
			{/if}
		</div>
	{/snippet}

	{#key category}
		<Collection
			depth={1}
			isPage={true}
			components={items}
			meta={markdownContent.meta}
			{path}
			{category}
			{markdowns}
			{actionPath}
			tab={currentTab.value}
			redirect={$page.url.pathname}
		>
			{@html markdownContent.html}
		</Collection>
	{/key}
</PageMain>
