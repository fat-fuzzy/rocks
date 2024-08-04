<script lang="ts">
	import {getContext} from 'svelte'
	import fatFuzzyUi from '@fat-fuzzy/ui'
	import Element from '$lib/components/Element.svelte'
	import PlaybookHeader from '$lib/components/PlaybookHeader.svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	const {DEFAULT_TABS} = fatFuzzyUi.constants

	const {PageMain} = fatFuzzyUi.content

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

	let currentTab = $derived(playbookStore.currentTabs.ui || DEFAULT_TABS[0])

	let categoryItems: {[name: string]: any} = {
		tokens: fatFuzzyUi.tokens,
		blocks: fatFuzzyUi.blocks,
		layouts: fatFuzzyUi.layouts,
		recipes: fatFuzzyUi.recipes,
	}

	let description = $derived(`${title} | Doc`)
	let Component = $derived(categoryItems[category][title])
</script>

<PageMain pageName="UI" {title} {description} size="lg">
	{#snippet header()}
		<PlaybookHeader {title} meta={markdown.meta} {path} {actionPath} {redirect} />
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
