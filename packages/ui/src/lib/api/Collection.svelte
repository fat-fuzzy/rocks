<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'
	import {page} from '$app/stores'
	import {selectedStore} from '../stores/api'

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'stack'
	export let isPage = false
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category
	let classes = ''
	// TODO: color code sections
	// TODO; tokens section
	// TODO: composition section
	// TODO: feedback colors & component

	$: selected = $selectedStore
	$: componentNames = Object.keys(components)
	$: classes = `${$selected.settings.brightness ?? ''} ${$selected.settings.contrast ?? ''}`
	$: titleDepth = Number(depth) + 1
</script>

<Sidebar size="xs" align="end">
	<main slot="main" class={`l:${layout} ${classes}`}>
		{#if category === title.toLowerCase()}
			<section class={`l:${layout} card:xl inset`}>
				{#each componentNames as name}
					{@const component = components[name]}
					<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
				{/each}
			</section>
		{:else}
			<details>
				<summary class="l:switcher bp:xs card:lg box bg:primary:light">
					<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
						{category}
					</svelte:element>
				</summary>
				<section class={`l:${layout} card:xl inset`}>
					{#each componentNames as name}
						{@const component = components[name]}
						<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
					{/each}
				</section>
			</details>
		{/if}
	</main>
	<aside slot="side">
		{#if isPage}
			<Api {title} {category} />
		{/if}
	</aside>
</Sidebar>
