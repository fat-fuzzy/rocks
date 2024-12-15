<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	import Element from '$lib/components/Element.svelte'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	type Props = {
		category: any // TODO: fix types
		content: any
		path: string
		formaction?: string
		actionPath: string
		redirect: string
		title: any
	}
	let {
		category,
		content,
		path,
		formaction,
		actionPath,
		redirect,
		title,
	}: Props = $props()

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
		<EscapeHtml id={content.meta.slug} html={content.html} size="lg" />
	</Element>
</PageMain>
