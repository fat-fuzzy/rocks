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
	export let category = $page.params.category || 'app'
	let classes = ''
	// TODO: color code sections
	// TODO; tokens section
	// TODO: composition section
	// TODO: feedback colors & component

	$: selected = $selectedStore
	$: componentNames = Object.keys(components)
	$: classes = `${$selected.brightness ?? ''} ${$selected.contrast ?? ''}`
	$: titleDepth = Number(depth) + 1
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={`l:${layout} card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
			{/each}
		</section>
		<aside slot="side">
			<Api {title} {category} />
		</aside>
	</Sidebar>
{:else}
	<details class="l:stack">
		<summary class="l:switcher bp:xs card:lg box bg:primary:light">
			<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
				{category}
			</svelte:element>
		</summary>
		<section class={`l:${layout} card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
			{/each}
		</section>
	</details>
{/if}
