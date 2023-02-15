<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'
	import {page} from '$app/stores'
	import type {StyleTree} from './styles-api'
	import {selectedStore} from '../stores/api'

	export let uiState: StyleTree // TODO: figure out how to avoid this prop drilling

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'switcher' // TODO: expose breakpoint too
	export let isPage = false
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category || 'app'
	let classes = ''
	let selected = uiState
	// TODO: color code sections
	// TODO; tokens section
	// TODO: composition section
	// TODO: feedback colors & component
	$: selected = $selectedStore
	$: componentNames = Object.keys(components)
	$: brightness = selected.app?.settings.brightness ?? ''
	$: contrast = selected.app?.settings.contrast ?? ''
	$: classes = `${brightness} ${contrast} l:${layout} bp:xs`
	$: titleDepth = Number(depth) + 1
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={`card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element
					title={name}
					depth={Number(depth) + 2}
					{path}
					{category}
					{component}
					uiState={selected}
				/>
			{/each}
		</section>
		<aside slot="side">
			<Api {title} {category} uiState={selected} />
		</aside>
	</Sidebar>
{:else}
	<details class="l:stack md">
		<summary class="l:switcher bp:xs card:lg box bg:primary:light">
			<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
				{category}
			</svelte:element>
		</summary>
		<section class={`card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element
					title={name}
					depth={Number(depth) + 2}
					{path}
					{category}
					{component}
					uiState={selected}
				/>
			{/each}
		</section>
	</details>
{/if}
