<script lang="ts">
	import {setContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import Element from '$lib/components/Element.svelte'
	import StylesApi from '$lib/api/styles.svelte'
	import PlaybookActor from '$lib/api/actor.svelte'

	const {EscapeHtml} = ui.headless

	type Props = {
		category: any // TODO: fix types
		content: any
		path: string
		formaction?: string
		actionPath?: string
		redirect?: string
		title: any
		actor: PlaybookActor
		context: StylesApi
	}
	let {
		category,
		content,
		path,
		formaction,
		actionPath,
		redirect,
		title,
		actor,
		context,
	}: Props = $props()

	setContext('playbookActor', actor)
	setContext('playbookContext', context)

	let categoryItems: {[name: string]: any} = {
		tokens: ui.tokens,
		blocks: ui.blocks,
		layouts: ui.layouts,
		recipes: ui.recipes,
	}

	let SpecifiedElement = $derived(categoryItems[category][title])
</script>

<Element
	isPage={true}
	depth={1}
	{title}
	{path}
	{category}
	{SpecifiedElement}
	meta={content.meta}
	{formaction}
	{actionPath}
	{redirect}
>
	<EscapeHtml
		id={content.meta.slug}
		html={content.html}
		size="md"
		margin="auto"
		element="article"
	/>
</Element>
