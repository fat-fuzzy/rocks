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
	export let layout = 'switcher' // TODO: expose breakpoint too
	export let breakpoint = 'xxl' // TODO: expose breakpoint too
	export let isPage = false
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category || 'app'

	let selected = $selectedStore

	let brightness = ''
	let contrast = ''
	let classes = ''

	// TODO: color code sections
	// TODO; tokens section
	// TODO: composition section
	// TODO: feedback colors & component

	$: {
		selected = $selectedStore
		// App settings (user controlled)
		brightness = selected.app?.settings.brightness ?? brightness
		contrast = selected.app?.settings.contrast ?? contrast
		classes = `l:${layout} bp:${breakpoint} ${brightness} ${contrast}`
	}
	$: componentNames = Object.keys(components)
	$: titleDepth = Number(depth) + 1
	$: classes = category !== 'app' ? `l:${layout} bp:${breakpoint} ${brightness} ${contrast}` : ''
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<div slot="main" class="card:lg inset">
			<section class={classes}>
				{#each componentNames as name}
					{@const component = components[name]}
					<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
				{/each}
			</section>
		</div>
		<aside slot="side">
			<Api {title} {category} />
		</aside>
	</Sidebar>
{:else}
	<details class="l:stack:sm" open>
		<summary class="card:lg box bg:primary">
			<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
				{category}
			</svelte:element>
		</summary>
		<div class="card:lg inset">
			<section class={classes}>
				{#each componentNames as name}
					{@const component = components[name]}
					<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
				{/each}
			</section>
		</div>
	</details>
{/if}
