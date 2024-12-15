<script lang="ts">
	import ui from '@fat-fuzzy/ui'
	import Element from '$lib/components/Element.svelte'
	import Api from '$lib/components/Api.svelte'

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

	let categoryItems: {[name: string]: any} = {
		tokens: ui.tokens,
		blocks: ui.blocks,
		layouts: ui.layouts,
		recipes: ui.recipes,
	}

	let description = $derived(`${title} | Doc`)
	let SpecifiedElement = $derived(categoryItems[category][title])
	let isPlaybook = $derived(path.includes('#playbook'))
</script>

<PageMain pageName="UI" {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
		<div class="l:main l:flex reverse">
			{#if isPlaybook}
				<Api
					categories={['app']}
					meta={content.meta}
					{path}
					{actionPath}
					{redirect}
				/>
			{/if}
		</div>
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
	>
		<EscapeHtml id={content.meta.slug} html={content.html} size="lg" />
	</Element>
</PageMain>
