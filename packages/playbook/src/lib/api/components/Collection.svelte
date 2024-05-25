<script lang="ts">
	import type {ComponentType, Snippet} from 'svelte'
	import type {StylesApi} from '$lib/api/components/styles.api'
	import type {Markdowns} from '$lib/api/props/types'

	import {getContext} from 'svelte'
	import {page} from '$app/stores'

	import {getCategoryMarkdowns, getElementMeta} from '$lib/api/props'

	import Api from './Api.svelte'
	import Element from './Element.svelte'

	type Props = {
		depth?: number
		isPage?: boolean
		path?: string
		components: {[name: string]: ComponentType}
		actionPath?: string
		redirect?: string
		category?: string
		color?: string
		size?: string
		layout?: string
		settings: any
		markdowns: Markdowns
		content: {html: Snippet}
	}

	let {
		isPage = false,
		depth = 0,
		path = $page.url.pathname,
		components,
		actionPath,
		redirect,
		size = 'xs',
		color = 'primary:light',
		layout = 'grid',
		category = $page.params.category,
		markdowns,
		content,
	}: Props = $props()

	const multipleCategories = ['graphics', 'recipes']
	const stylesApi: StylesApi = $state(getContext('stylesApi'))

	let componentNames = $state(Object.keys(components))
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
	<div class="l:sidebar:xs align-content:end">
		<section class={`main ${layoutClass}`}>
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
		<section class="side">
			<div class="l:stack:lg">
				<details id={`${category}-api`} class="l:stackmd" open>
					<summary class={`box:${color} bg:${color}`}>Props</summary>
					{#if category !== 'graphics' && category !== 'tokens' && category !== 'recipes'}
						<div class="drop w:full bg:polar ui:menu">
							<Api {categories} {path} {actionPath} {redirect} />
						</div>
					{:else}
						<div class="card:lg text:center">
							<p class={`font:xl`}>🐰</p>
							<p class={`font:md`}>Coming soon!</p>
						</div>
					{/if}
				</details>
			</div>
		</section>
	</div>
{:else}
	<section class="l:text:lg snap:start">
		<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
			{category}
		</svelte:element>

		{#if content}
			{@render content.html()}
		{:else}
			<p class={`font:xl`}>🐰</p>
			<p class={`font:md`}>Coming soon!</p>
		{/if}
		<details class={`l:stack:md ${size}`}>
			<summary class={`box:${color} bg:${color}`}>
				{category}
			</summary>
			<div class="drop xxl">
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
			</div>
		</details>
	</section>
{/if}
