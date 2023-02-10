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

	export let category = $page.params.category || 'app'

	let ApiElement: {[category: string]: ComponentType} = {
		layouts: Layout,
		blocks: Block,
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: selected = $selectedStore
	$: brightness = $selected.brightness ?? ''
	$: contrast = $selected.contrast ?? ''
	$: size = $selected.size ?? ''
	$: container = $selected.container ? `l:${$selected.container} inset` : ''
	$: layout = $selected.layout ? `l:${$selected.layout}` : ''
	$: breakpoint = $selected.breakpoint ? `bp:${$selected.breakpoint}` : ''
	$: appSettings = `${brightness} ${contrast}`
	$: contextClasses = `${container} ${layout} ${breakpoint} ${size}`
</script>

{#if !isPage}
	<a class="primary" href={`${path}/${title}`}>
		<svelte:element this={`h${String(depth)}`} class="font:sm">{title} API 🔗</svelte:element>
	</a>
	<article class="l:stack md">
		<svelte:component this={ApiElement[category]} {component} />
	</article>
{:else}
	<header class="header-page">
		<h1>{title}</h1>
	</header>
	<article class="l:sidebar xs align:end">
		<main class={`l:main card:xl md inset ${appSettings}`}>
			<div class={`card:xl ${contextClasses}`}>
				<svelte:component this={ApiElement[category]} {component} />
			</div>
		</main>
		<aside class="l:side">
			<Api {title} {category} />
		</aside>
	</article>
{/if}
