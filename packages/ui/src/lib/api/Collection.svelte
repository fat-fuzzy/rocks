<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'
	import {selectedBlock, selectedLayout} from '../stores/api'
	import {API_OPTIONS} from './options'

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'stack'
	export let components: ComponentType[]
	export let category = ''
	let selected = category === 'layouts' ? $selectedLayout : $selectedBlock

	$: options = {...API_OPTIONS['app']}
	$: componentNames = Object.keys(components)
	$: app = selected.app ?? ''
	$: classes = `${selected.brightness ?? ''} ${selected.contrast ?? ''}`
	$: selected = category === 'layouts' ? $selectedLayout : $selectedBlock
</script>

<article>
	<Sidebar size="xs" align="end">
		<main slot="main" class={`l:${layout} card:lg inset ${classes}`}>
			{#each componentNames as name}
				{@const Component = components[name]}
				<Element title={name} {category} depth={Number(depth) + 1} {path} component={Component} />
			{/each}
		</main>
		<aside slot="side">
			<Api {title} {options} {category} />
		</aside>
	</Sidebar>
</article>
