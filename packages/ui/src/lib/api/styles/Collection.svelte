<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from '$lib/api/styles/'
	import type {StyleTree} from '$lib/api/styles/types'
	import type {Markdowns} from '$lib/api/props/types'

	import {onDestroy, getContext} from 'svelte'
	import {page} from '$app/stores'

	import {getCategoryMarkdowns, getElementMeta} from '$lib/api/props'
	import * as ui from '$stores/ui'

	import Sidebar from '$lib/components/layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'

	export let settings: any = ui
	export let actionPath: string | undefined
	export let redirect: string | undefined = undefined

	export let content = {html: ''}
	export let depth = 0
	export let path = $page.url.pathname

	export let layout = 'grid'
	export let size = 'xs'
	export let color = 'primary:light'
	export let isPage = false
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category
	export let markdowns: Markdowns

	const stylesApi: StylesApi = getContext('stylesApi')
	let background = ''
	let styles: StyleTree = stylesApi.getStyleTree()

	const stores = [
		settings.styles.subscribe((value: StyleTree) => {
			if (value) {
				styles = stylesApi.getStyleTree()
			}
		}),
	]

	$: componentNames = Object.keys(components)
	$: titleDepth = Number(depth) + 1
	$: background = background ? background : styles.app?.settings.contrast
	$: layoutClass = category === 'tokens' ? `l:stack:${size}` : `l:${layout}:${size}`
	$: categoryMarkdowns = getCategoryMarkdowns(category, markdowns)

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={layoutClass}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element
					title={name}
					depth={Number(depth) + 1}
					{path}
					{category}
					{component}
					{actionPath}
					meta={getElementMeta(categoryMarkdowns, name)}
					redirect={$page.url.pathname}
				/>
			{/each}
		</section>
		<section slot="side">
			<div class="l:stack:lg">
				<details id={`${category}-api`} class="l:stack:xs" open>
					<summary class={`bg:${color} box:primary:light`}>Style Props</summary>
					{#if category !== 'graphics' && category !== 'tokens' && category !== 'recipes'}
						<div class="drop w:full bg:polar ui:menu">
							<Api categories={[category]} {path} {actionPath} {redirect} />
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
	</Sidebar>
{:else}
	<section class="l:text:lg">
		<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
			{category}
		</svelte:element>

		{#if content}
			{@html content.html}
		{:else}
			<p class={`font:xl`}>🐰</p>
			<p class={`font:md`}>Coming soon!</p>
		{/if}
	</section>
	<section class="l:text:lg">
		<details class={`l:stack:md ${size}`} open>
			<summary class={`card:md box:${color} bg:${color}`}>
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
							meta={getElementMeta(categoryMarkdowns, name)}
						/>
					{/each}
				</div>
			</div>
		</details>
	</section>
{/if}
