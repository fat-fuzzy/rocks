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
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category
	let classes = ''

	$: selected = $selectedStore
	$: componentNames = Object.keys(components)
	$: classes = `${$selected.settings.brightness ?? ''} ${$selected.settings.contrast ?? ''}`
	$: titleDepth = Number(depth) + 1
</script>

<Sidebar size="xs" align="end">
	<main slot="main" class={`card:lg inset ${classes}`}>
		<section class={`l:${layout}`}>
			<svelte:element this={`h${String(titleDepth)}`} class="font:lg">{category}</svelte:element>
			{#each componentNames as name}
				{@const component = components[name]}
				<Element title={name} depth={Number(depth) + 2} {path} {category} {component} />
			{/each}
		</section>
	</main>
	<aside slot="side">
		<Api {title} {category} />
	</aside>
</Sidebar>
