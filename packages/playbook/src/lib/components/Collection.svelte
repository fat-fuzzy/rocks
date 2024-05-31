<script lang="ts">
	import type { Snippet} from 'svelte'
	import type {Markdowns} from '$lib/props/types'

	import {page} from '$app/stores'

	import {getCategoryMarkdowns, getElementMeta} from '$lib/props'

	import Api from './Api.svelte'
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
		markdowns: Markdowns
		children?: Snippet
		meta?: any
	}

	let {
		isPage = false,
		depth = 0,
		path,
		components,
		actionPath,
		redirect,
		size = 'md',
		color = 'primary:100',
		layout = 'grid',
		category,
		markdowns,
		children,
		meta
	}: Props = $props()

	const multipleCategories = ['graphics', 'recipes']

	let componentNames = $derived(Object.keys(components))
	let titleDepth = $derived(Number(depth) + 1)
	let layoutClass = $derived(
		category === 'tokens' ? `l:stack:${size}` : `l:${layout}:${size}`,
	)
	let categoryMarkdowns = $derived(getCategoryMarkdowns(category, markdowns))
	let categories = $derived(
		multipleCategories.includes(category)
			? ['blocks', 'layouts', 'shared']
			: [category],
	)
</script>

{#if isPage}
	<div class="l:sidebar:md">
		<section class={`l:main ${layoutClass}`}>
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
					redirect={$page.url.pathname}
				/>
			{/each}
		</section>
		<section class="l:side l:stack:md w:full">
			<details id={`${category}-api`} class="l:stack:md maki:inline:xs size:xs" open>
				<summary class={`variant:${color} bg:${color}`}>Props</summary>
				{#if category !== 'graphics' && category !== 'tokens' && category !== 'recipes'}
					<div class="ui:menu">
						<Api {categories} {path} {actionPath} {redirect} {meta}/>
					</div>
				{:else}
					<div class="card:lg text:center">
						<p class={`font:xl`}>🐰</p>
						<p class={`font:md`}>Coming soon!</p>
					</div>
				{/if}
			</details>
		</section>
	</div>
{:else}
	<section class="l:text:lg snap:start">
		<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
			{category}
		</svelte:element>

		{#if children}
			{@render children()}
		{:else}
			<p class={`font:xl`}>🐰</p>
			<p class={`font:md`}>Coming soon!</p>
		{/if}
		<details class={`l:stack:md ${size}`}>
			<summary class={`box:${color} bg:${color}`}>
				{category}
			</summary>
			<div class={layoutClass}>
				{#each componentNames as name}
					{@const component = components[name]}
					<Element
						title={name}
						depth={Number(depth) + 2}
						{path}
						{category}
						{component}
						{actionPath}
						meta={getElementMeta(name, categoryMarkdowns)}
					/>
				{/each}
			</div>
		</details>
	</section>
{/if}
