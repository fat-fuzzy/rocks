<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'
	import {selectedStore} from '../stores/api'

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'stack'
	export let components: {[name: string]: ComponentType}
	export let category = ''
	let classes = ''

	$: selected = $selectedStore
	$: componentNames = Object.keys(components)
	$: classes = `${$selected.settings.brightness ?? ''} ${$selected.settings.contrast ?? ''}`
</script>

<article>
	<Sidebar size="xs" align="end">
		<main slot="main" class={`l:${layout} card:lg inset ${classes}`}>
			{#each componentNames as name}
				{@const UiElement = components[name]}
				<Element title={name} {category} depth={Number(depth) + 1} {path} {UiElement} />
			{/each}
		</main>
		<aside slot="side">
			<Api {title} {category} />
		</aside>
	</Sidebar>
</article>
