<script lang="ts">
	import type { Snippet} from 'svelte'
	import type {Markdowns, Meta} from '$lib/props/types'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'

	import {getCategoryMarkdowns, getElementMeta} from '$lib/props'

	import Element from './Element.svelte'

	type Props = {
		depth?: number
		isPage?: boolean
		path: string
		components: {[name: string]: any} // TODO: fix types
		actionPath?: string
		redirect?: string
		category: string
		color?: string
		size?: string
		layout?: string
		tab?: string
		markdowns: Markdowns
		children?: Snippet
		meta: Meta
	}

	let {
		isPage = false,
		depth = 0,
		path,
		components,
		actionPath,
		redirect,
		size = 'md',
		color = 'neutral',
		layout = 'switcher',
		category,
		markdowns,
		tab,
		meta,
		children,
	}: Props = $props()

	let componentNames = $derived(Object.keys(components))
	let titleDepth = $derived(Number(depth) + 1)
	let layoutClass = $derived(category === 'tokens' ? `l:stack:${size}` : category === 'recipes' ? `l:${layout}:lg` : `l:${layout}:${size}`)
	let categoryMarkdowns = $derived(getCategoryMarkdowns(category, markdowns))
	let categories = $derived(category === 'recipes'
			? ['blocks', 'layouts', 'shared']
			: category === 'tokens' ? undefined
			: [category])
</script>

{#snippet categoryElements()}
	{#each componentNames as name}
		{@const component = components[name]}
		<Element
			title={name}
			depth={Number(depth) + 1}
			{path}
			{category}
			{component}
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

{#if isPage}
	<div class="l:sidebar:md">
		{#if tab === 'demo'}
			<section class={`l:main ${layoutClass}`}>
				{@render categoryElements()}
			</section>
			<aside class="l:side l:stack:md">
				{#key category}
					<PropsDemo
						{path}
						{actionPath}
						{redirect}
						color = 'primary'
						{meta}
						{categories}
					/>
				{/key}
			</aside>
		{:else if tab === 'doc'}
			<section class="l:main">
				{#if children}
					{@render children()}
				{/if}
			</section>
			<aside class="l:side l:stack:md">
				<PropsDoc {meta} />
			</aside>
		{/if}
	</div>
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
