<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'
	import {page} from '$app/stores'
	import {selectedStore} from '../stores/api'

	export let uiState = '' // TODO: figure out how to avoid this prop drilling

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'switcher' // TODO: expose breakpoint too
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
	$: brightness = selected.brightness ?? ''
	$: contrast = selected.contrast ?? ''
	$: classes = `${brightness} ${contrast} l:${layout} bp:xs`
	$: titleDepth = Number(depth) + 1
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={`card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element title={name} depth={Number(depth) + 2} {path} {category} {component} {uiState} />
			{/each}
		</section>
		<aside slot="side">
			<Api {title} {category} {uiState} />
		</aside>
	</Sidebar>
{:else}
	<details>
		<summary class="l:switcher bp:xs card:lg box bg:primary:light">
			<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
				{category}
			</svelte:element>
		</summary>
		<section class={`card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element title={name} depth={Number(depth) + 2} {path} {category} {component} {uiState} />
			{/each}
		</section>
	</details>
{/if}
