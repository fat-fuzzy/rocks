<script lang="ts">
	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import Element from '$lib/components/Element.svelte'
	import PlaybookHeader from '$lib/components/PlaybookHeader.svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	const {DEFAULT_TABS} = ui.constants

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	type Props = {
		category: any // TODO: fix types
		content: any
		path: string
		actionPath: string
		redirect: string
		title: any
	}

	let {category, content, path, actionPath, redirect, title}: Props = $props()

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')

	let currentTab = $derived(playbookStore.currentTabs.ui || DEFAULT_TABS[0])

	let categoryItems: {[name: string]: any} = {
		tokens: ui.tokens,
		blocks: ui.blocks,
		layouts: ui.layouts,
		recipes: ui.recipes,
	}

	let description = $derived(`${title} | Doc`)
	let SpecifiedElement = $derived(categoryItems[category][title])
</script>

<PageMain pageName="UI" {title} {description} size="lg">
	{#snippet header()}
		<PlaybookHeader {title} meta={content.meta} {path} {actionPath} {redirect} />
	{/snippet}

	<Element
		isPage={true}
		depth={1}
		{title}
		{path}
		{category}
		{SpecifiedElement}
		meta={content.meta}
		{actionPath}
		{redirect}
		tab={currentTab.value}
	>
		<div class="l:text:lg">
			<EscapeHtml html={content.html} />
		</div>
	</Element>
</PageMain>
