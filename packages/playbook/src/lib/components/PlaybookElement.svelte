<script lang="ts">
	import {getContext} from 'svelte'
	import {enhance} from '$app/forms'
	import {tokens, blocks, layouts, recipes, content, constants} from '@fat-fuzzy/ui'
	import {api} from '@fat-fuzzy/playbook'
	import PlaybookStore from '$lib/api/store.svelte'

	const {DEFAULT_TABS, TABS} = constants

	const {PageMain} = content
	const {Element, Api} = api
	const {ToggleMenu} = recipes

	type Props = {
		category: any // TODO: fix types
		markdown: any
		path: string
		actionPath: string
		redirect: string
		meta: any
		title: any
	}

	let {category, markdown, path, actionPath, redirect, title}: Props = $props()

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')

	const tabs = TABS

	let currentTabs = playbookStore.currentTabs
	let currentTab = $state(currentTabs.ui || DEFAULT_TABS[0])

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
	}

	let description = $derived(`${title} | Doc`)
	let Component = $derived(categoryItems[category][title])

	function handleTabChange(selected: { name: string; value: string|number; state: string; }[]) {
		if(selected.length === 0) {
			return
		}
		currentTab = {...selected[0], value: String(selected[0].value), title: selected[0].name, id: selected[0].name}
	}
</script>

<PageMain pageName="UI" {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
		<div class="l:main l:flex reverse">
			<form
				method="POST"
				class="tabs"
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
					container="card:md"
					color="primary"
					shape="round"
					variant="outline"
					formaction={`${actionPath}?/updateTab&redirectTo=${redirect}`}
					onupdate={handleTabChange}
					init={handleTabChange}
				/>
			</form>
			{#if currentTab.value === 'demo'}
				<Api
					categories={['app']}
					meta={markdown.meta}
					{path}
					{actionPath}
					{redirect}
				/>
			{/if}
		</div>
	{/snippet}

	{#key title}
		<Element
			isPage={true}
			depth={1}
			{title}
			{path}
			{category}
			component={Component}
			meta={markdown.meta}
			{actionPath}
			{redirect}
			tab={currentTab.value}
		>
			<div class="l:text:lg">{@html markdown.html}</div>
		</Element>
	{/key}
</PageMain>
