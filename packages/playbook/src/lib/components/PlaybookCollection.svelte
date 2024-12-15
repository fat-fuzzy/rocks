<script lang="ts">
	import type {Snippet} from 'svelte'
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import Collection from '$lib/components/Collection.svelte'
	import Api from '$lib/components/Api.svelte'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

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

	let {
		category,
		markdowns,
		content,
		path,
		actionPath,
		redirect,
		depth = 1,
		isPage = true,
		children,
	}: Props = $props()

	const components = [
		{category: 'tokens', items: ui.tokens},
		{category: 'blocks', items: ui.blocks},
		{category: 'layouts', items: ui.layouts},
		{category: 'recipes', items: ui.recipes},
	]

	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)
	let isPlaybook = $derived(path.includes('#playbook'))
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
		redirect={$page.url.pathname}
	>
		{#if isPage}
			<EscapeHtml id={content.meta.slug} html={content.html} size="lg" />
		{:else if children}
			{@render children()}
		{/if}
	</Collection>
{/snippet}

{#if isPage}
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
		{#key category}
			{@render collection()}
		{/key}
	</PageMain>
{:else}
	{@render collection()}
{/if}
