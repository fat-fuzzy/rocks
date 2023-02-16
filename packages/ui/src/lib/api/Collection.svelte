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
	let selected = uiState

	let brightness = ''
	let contrast = ''
	let container = ''

	// TODO: color code sections
	// TODO; tokens section
	// TODO: composition section
	// TODO: feedback colors & component

	$: {
		selected = $selectedStore
		// App settings (user controlled)
		brightness = selected.app?.settings.brightness ?? brightness
		contrast = selected.app?.settings.contrast ?? contrast
		// Container options
		// - [container + size] work together
		container = selected.shared?.context.container ?? container
	}
	$: componentNames = Object.keys(components)
	$: classes = `card:xl inset l:${layout} bp:xs ${brightness} ${contrast}`
	$: titleDepth = Number(depth) + 1
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={classes}>
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
	<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
		{category}
	</svelte:element>
	<details class="l:stack sm">
		<summary class="card:lg box">{category} collection</summary>
		<section class={classes}>
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
