<script lang="ts">
	import type {Snippet} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'
	import Element from './Element.svelte'

	import {
		getCategoryMarkdowns,
		getElementMeta,
		getPlaybookTab,
		getDocTab,
	} from '$lib/props'
	import {page} from '$app/state'

	const {EscapeHtml} = ui.headless
	const {PageRails} = ui.drafts
	const {Magic} = ui.blocks

	type Props = {
		category: any // TODO: fix types
		markdowns: any
		content: any
		path: string
		depth: number
		isPage: boolean
		color?: string
		size?: string
		layout?: string
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
		size = 'md',
		color = 'primary',
		layout = 'switcher',
		formaction,
		actionPath,
		redirect,
		children,
	}: Props = $props()

	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)
	let titleDepth = $derived(Number(depth) + 1)
	let pageNav = [
		{
			...getDocTab(),
			labelledBy: category,
		},
		{
			...getPlaybookTab(),
			labelledBy: category,
		},
	]
	const components: {category: string; items: any}[] = [
		{category: 'tokens', items: ui.tokens},
		{category: 'blocks', items: ui.blocks},
		{category: 'layouts', items: ui.layouts},
		{category: 'recipes', items: ui.recipes},
	]

	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let componentNames = $derived(Object.keys(items))
	let categoryMarkdowns = $derived(getCategoryMarkdowns(category, markdowns))

	let layoutClass = $derived(
		category === 'tokens'
			? `l:stack:${size}`
			: category === 'recipes'
				? `l:${layout}:lg`
				: `l:${layout}:${size}`,
	)
</script>

{#snippet categoryElements()}
	{#each componentNames as name}
		{@const SpecifiedElement = items[name]}
		<Element
			title={name}
			depth={isPage ? Number(depth) + 1 : Number(depth) + 2}
			{path}
			{category}
			{SpecifiedElement}
			{formaction}
			{actionPath}
			meta={getElementMeta(name, categoryMarkdowns)}
			{redirect}
		/>
	{/each}
{/snippet}

{#snippet comingSoon()}
	<div class="ravioli:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

<PageRails
	pageName="UI"
	{title}
	{description}
	{path}
	hash={page.url.hash}
	nav={pageNav}
	size="sm"
>
	{#snippet main()}
		{#if isPage}
			<EscapeHtml
				id={content.meta.slug}
				html={content.html}
				size="md"
				margin="auto"
				element="article"
			/>
			<div class="maki:block size:2xl">
				<div class="l:text:lg maki:auto size:xl">
					<Magic spell="bleu" uno="magic" due="sparkles" size="md" grow={true}>
						<h2 id="playbook" class="w:full text:center">Playbook</h2>
					</Magic>
				</div>
				<div class="media l:grid:sm">
					{@render categoryElements()}
				</div>
			</div>
		{:else if children}
			<section class="l:text:lg snap:start">
				<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
					{category}
				</svelte:element>
				{#if children}
					{@render children()}
				{:else}
					{@render comingSoon()}
				{/if}
				<details class={`l:stack:md ${size}`}>
					<summary
						class={`color:${color} variant:outline ravioli:2xs emoji:${category}`}
					>
						{category}
					</summary>
					<div class={layoutClass}>
						{@render categoryElements()}
					</div>
				</details>
			</section>
		{/if}
	{/snippet}

	{#snippet side()}
		<div class="l:stack:md">
			{#key category}
				<PropsDoc meta={content.meta} />
				<PropsDemo
					{path}
					{actionPath}
					{redirect}
					meta={content.meta}
					categories={[category]}
				/>
			{/key}
		</div>
	{/snippet}
</PageRails>
