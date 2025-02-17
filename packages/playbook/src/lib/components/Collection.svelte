<script lang="ts">
	import type {Snippet} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import type {Markdowns, Meta} from '$types'

	import Api from '$lib/components/Api.svelte'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'

	import {
		getCategoryMarkdowns,
		getElementMeta,
		getPlaybookTab,
		getDocTab,
	} from '$lib/props'

	import Element from './Element.svelte'

	const {PageTabs} = ui.drafts

	type Props = {
		depth?: number
		isPage?: boolean
		path: string
		components: {[name: string]: any} // TODO: fix types
		formaction?: string
		actionPath?: string
		redirect?: string
		category: string
		color?: string
		size?: string
		layout?: string
		markdowns: Markdowns
		children?: Snippet
		meta: Meta
	}

	let {
		isPage = false,
		depth = 0,
		path,
		components,
		formaction,
		actionPath,
		redirect,
		size = 'md',
		color = 'neutral',
		layout = 'switcher',
		category,
		markdowns,
		meta,
		children,
	}: Props = $props()

	let tabs = [
		{
			...getDocTab(),
			content: docContent,
			labelledBy: category,
		},
		{
			...getPlaybookTab(),
			header: playbookHeader,
			content: playbookContent,
			labelledBy: category,
		},
	]
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let description = $derived(`${title} | Doc`)
	let componentNames = $derived(Object.keys(components))
	let titleDepth = $derived(Number(depth) + 1)
	let layoutClass = $derived(
		category === 'tokens'
			? `l:stack:${size}`
			: category === 'recipes'
				? `l:${layout}:lg`
				: `l:${layout}:${size}`,
	)
	let categoryMarkdowns = $derived(getCategoryMarkdowns(category, markdowns))
</script>

{#snippet categoryElements()}
	{#each componentNames as name}
		{@const SpecifiedElement = components[name]}
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
	<div class="card:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

{#snippet playbookHeader()}
	<Api categories={['app']} {meta} {path} {actionPath} {redirect} />
{/snippet}

{#snippet playbookContent()}
	<div class="l:sidebar:md media end">
		<aside class="l:side l:stack:md">
			{#key category}
				<PropsDemo
					{path}
					{actionPath}
					{redirect}
					{meta}
					categories={[category]}
				/>
			{/key}
		</aside>
		<div id={`tabs-${category}-playbook`} class={`l:main ${layoutClass}`}>
			{@render categoryElements()}
		</div>
	</div>
{/snippet}

{#snippet docContent()}
	<div class="l:sidebar:md">
		<div id={`tabs-${category}-doc`} class="l:main">
			{#if children}
				{@render children()}
			{/if}
		</div>
		<aside class="l:side l:stack:md">
			<PropsDoc {meta} />
		</aside>
	</div>
{/snippet}

{#if isPage}
	<PageTabs pageName="UI" {title} {description} size="lg" {path} {tabs}>
		{#snippet header()}
			<h1 id={category} class="maki:block:md">{title}</h1>
		{/snippet}
	</PageTabs>
{:else}
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
			<summary class={`surface:2:${color} card:2xs emoji:${category}`}>
				{category}
			</summary>
			<div class={layoutClass}>
				{@render categoryElements()}
			</div>
		</details>
	</section>
{/if}
