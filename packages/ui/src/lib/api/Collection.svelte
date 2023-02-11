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
	$: brightness = $selected.brightness ?? ''
	$: contrast = $selected.contrast ?? ''
	$: container = $selected.container ? `l:${$selected.container}` : ''
	$: layout = $selected.layout ? `l:${$selected.layout}` : ''
	$: breakpoint = $selected.breakpoint ? `bp:${$selected.breakpoint}` : ''
	$: classes = `${brightness} ${contrast} ${container} ${layout} ${breakpoint}`
	$: titleDepth = Number(depth) + 1
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<section slot="main" class={`card:xl l:stack xl inset ${classes}`}>
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
	<details class="l:stack xl">
		<summary class="l:switcher bp:xs card:lg box bg:primary:light">
			<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
				{category}
			</svelte:element>
		</summary>
		<section class={`card:xl inset ${classes}`}>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
			{/each}
		</section>
	</details>
{/if}
