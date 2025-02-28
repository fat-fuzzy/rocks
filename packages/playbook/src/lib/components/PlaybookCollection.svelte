<script lang="ts">
	import type {Snippet} from 'svelte'
	import {setContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import Collection from '$lib/components/Collection.svelte'
	import StylesApi from '$lib/api/styles.svelte'
	import PlaybookActor from '$lib/api/actor.svelte'

	const {EscapeHtml} = ui.headless

	type Props = {
		category: any // TODO: fix types
		markdowns: any
		content: any
		path: string
		depth: number
		isPage: boolean
		formaction?: string
		actionPath?: string
		redirect?: string
		children?: Snippet
		actor: PlaybookActor
		context: StylesApi
	}

	let {
		category,
		markdowns,
		content,
		path,
		depth = 1,
		isPage = true,
		formaction,
		actionPath,
		redirect,
		children,
		actor,
		context,
	}: Props = $props()

	setContext('playbookActor', actor)
	setContext('playbookContext', context)

	const components = [
		{category: 'tokens', items: ui.tokens},
		{category: 'blocks', items: ui.blocks},
		{category: 'layouts', items: ui.layouts},
		{category: 'recipes', items: ui.recipes},
	]

	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
</script>

<Collection
	{depth}
	{isPage}
	components={items}
	meta={content.meta}
	{path}
	{category}
	{markdowns}
	{formaction}
	{actionPath}
	{redirect}
>
	{#if isPage}
		<EscapeHtml
			id={content.meta.slug}
			html={content.html}
			size="md"
			margin="auto"
			element="article"
		/>
	{:else if children}
		{@render children()}
	{/if}
</Collection>
