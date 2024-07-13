

<script lang="ts">
	import type { Snippet} from 'svelte'
	import type {Markdowns} from '$lib/props/types'
	import {enhance} from '$app/forms'
	import {getContext} from 'svelte'

	import {tokens, blocks, layouts, recipes, content, constants} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'
	import PlaybookStore from '$lib/api/store.svelte'

	const {Collection, Api} = api
	const {ToggleMenu} = recipes
	const {PageMain} = content
	const {DEFAULT_TABS, TABS} = constants

	const tabs = TABS
	type Props = {
		depth?: number
		isPage?: boolean
		path: string
		actionPath?: string
		redirect?: string
		category: string
		color?: string
		size?: string
		layout?: string
		markdowns: Markdowns
		children?: Snippet
		meta: any
	}

	let {
		isPage = false,
		depth = 0,
		path,
		actionPath,
		redirect,
		size = 'md',
		color = 'primary:100',
		layout = 'grid',
		category,
		markdowns,
		children,
		meta
	}: Props = $props()


	const components = [
		{category: 'tokens', items: tokens},
		{category: 'blocks', items: blocks},
		{category: 'layouts', items: layouts},
		{category: 'recipes', items: recipes},
	]

	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let currentTabs = PlaybookStore.currentTabs
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

<PageMain {title} {description} size="xl">
{#snippet header()}
<h1 class="l:side hug maki:block:md">{title}</h1>
<div class="l:main l:flex">
	<form
		method="POST"
		class="tabs flex nowrap"
		action={`/ui?/updateTab&redirectTo=${redirect}`}
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
	{#if currentTab.value === 'demo'}
		<Api
			categories={['app']}
			{meta}
			{path}
			{actionPath}
			{redirect}
		/>
	{/if}
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
			<details open
			class="l:stack:md size:xs">
				<summary class="surface:2:primary">Style Props</summary>
				<ul class="tags l:switcher:md">
					{#each markdownContent.meta.props_style as prop}
						<li class="card:xs font:sm surface:1:primary">{prop}</li>
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
	{redirect}
>
	{@html markdowns.categories.find(({meta}) => meta.slug === category).html}
</Collection>
{/if}
</PageMain>
