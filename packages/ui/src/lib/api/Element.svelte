<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {page} from '$app/stores'
	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import {selectedStore} from '../stores/api'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType
	export let action = 'enter'

	export let category = $page.params.category || 'app'

	let ApiElement: {[category: string]: ComponentType} = {
		layouts: Layout,
		blocks: Block,
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: selected = $selectedStore
	$: brightness = $selected.brightness ?? ''
	$: contrast = $selected.contrast ?? ''
	$: appSettings = `${brightness} ${contrast}`
</script>

{#if !isPage}
	<article class="l:stack card:xl md">
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:sm">{title} API 🔗</svelte:element>
		</a>
		<svelte:component this={ApiElement[category]} {isPage} {title} {component} />
	</article>
{:else}
	<header class="header-page">
		<h1>{title}</h1>
	</header>
	<article class="l:sidebar xs align:end">
		<main class={`l:main card:xl md inset ${appSettings}`}>
			<svelte:component this={ApiElement[category]} {isPage} {title} {component} />
		</main>
		<aside class="l:side">
			<Api {action} {title} {category} />
		</aside>
	</article>
{/if}
