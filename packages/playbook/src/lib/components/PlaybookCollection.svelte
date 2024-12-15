<script lang="ts">
	import type {Snippet} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import Collection from '$lib/components/Collection.svelte'

	const {PageMain} = ui.content
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
		{formaction}
		{actionPath}
		{redirect}
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
		{#key category}
			{@render collection()}
		{/key}
	</PageMain>
{:else}
	{@render collection()}
{/if}
