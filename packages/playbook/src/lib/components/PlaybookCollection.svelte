<script lang="ts">
	import {getContext, type Snippet} from 'svelte'
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import Collection from '$lib/components/Collection.svelte'
	import PlaybookHeader from '$lib/components/PlaybookHeader.svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {DEFAULT_TABS} = ui.constants

	type Props = {
		category: any // TODO: fix types
		markdowns: any
		content: any
		path: string
		actionPath: string
		redirect: string
		depth: number
		isPage: boolean
		children?: Snippet
	}

	let {category, markdowns, content, path, actionPath, redirect, depth=1, isPage=true, children}: Props = $props()

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')

	const components = [
		{category: 'tokens', items: ui.tokens},
		{category: 'blocks', items: ui.blocks},
		{category: 'layouts', items: ui.layouts},
		{category: 'recipes', items: ui.recipes},
	]
	
	let currentTab = $derived(playbookStore.currentTabs.ui || DEFAULT_TABS[0])

	let items = $derived(components.find(({category: c}) => c === category)?.items ?? [])
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)

</script>

{#snippet collection()}
	<Collection
	{depth}
	{isPage}
	components={items}
	meta={content.meta}
	{path}
	{category}
	{markdowns}
	{actionPath}
	tab={currentTab.value}
	redirect={$page.url.pathname}
	>
	{#if isPage}
		<EscapeHtml html={content.html} />
	{:else if children}
		{@render children()}
	{/if}	
	</Collection>
{/snippet}

{#if isPage}
	<PageMain pageName="UI" {title} {description} size="lg">
		{#snippet header()}
			<PlaybookHeader {title} meta={content.meta} {path} {actionPath} {redirect} />
		{/snippet}
		{#key category}
			{@render collection()}
		{/key}
	</PageMain>
{:else}
	{@render collection()}
{/if}
