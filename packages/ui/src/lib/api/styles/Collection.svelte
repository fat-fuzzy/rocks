<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from './styles-api'
	import type {StyleTree} from './types'

	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import {getProps} from '$lib/api/fixtures/js/fixtures-api'
	import {initStyles} from './styles-api'
	import * as ui from '$stores/ui'

	import Sidebar from '$lib/components/layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'

	export let settings: any = ui
	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined

	export let title = ''
	export let content: {html: string} | undefined = undefined
	export let depth = 0
	export let path = $page.url.pathname
	export let layout = 'grid' // TODO: expose breakpoint too
	export let size = 'xs' // TODO: expose breakpoint too
	export let color = 'primary:light' // TODO: expose breakpoint too
	export let isPage = false
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category || 'shared'
	export let stylesApi: StylesApi = initStyles()
	export let props: any

	let background = props?.background || ''
	let styles: StyleTree = stylesApi.getStyleTree()

	const stores = [
		settings.styles.subscribe((value) => {
			if (value) {
				styles = value
			}
		}),
	]

	$: componentNames = Object.keys(components)
	$: titleDepth = Number(depth) + 1
	$: background = background ? background : styles.app?.settings.contrast
	$: layoutClass = category === 'tokens' ? `l:stack:${size}` : `l:${layout}:${size}`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={layoutClass}>
			{#each componentNames as name}
				{@const component = components[name]}
				{@const props = getProps({category, component: name})}
				<Element
					title={name}
					depth={Number(depth) + 1}
					{path}
					{category}
					{component}
					{stylesApi}
					{props}
					{actionPath}
					redirect={$page.url.pathname}
				/>
			{/each}
		</section>
		<section slot="side">
			<div class="l:stack:lg">
				<details id={`${category}-api`} class="l:stack:lg" open>
					<summary class={`card:xs bg:${color} box:primary:light`}>Style Props</summary>
					{#if category !== 'graphics' && category !== 'tokens'}
						<div class="drop w:full bg:polar ui:menu">
							<Api categories={[category]} {title} {path} {actionPath} {redirect} />
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
	<section class="l:text:xl card:xl">
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
	<section>
		<details class={`l:stack:md ${size}`} open>
			<summary class={`card:md box:${color} bg:${color}`}>
				{category}
			</summary>
			<div class="drop xxl">
				<div class={layoutClass}>
					{#each componentNames as name}
						{@const component = components[name]}
						{@const props = getProps({category, component: name})}
						<Element
							title={name}
							depth={Number(depth) + 2}
							{path}
							{category}
							{component}
							{stylesApi}
							{props}
							{actionPath}
							redirect={$page.url.pathname}
						/>
					{/each}
				</div>
			</div>
		</details>
	</section>
{/if}
