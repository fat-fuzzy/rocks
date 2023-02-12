<script lang="ts">
	import type {PageData} from './$types'
	import type {ComponentType} from 'svelte'
	import {page} from '$app/stores'
	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import {selectedStore} from '../stores/api'

	export let data: PageData

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
	$: container = $selected.container ? `l:${$selected.container}` : ''
	$: breakpoint = $selected.breakpoint ? `bp:${$selected.breakpoint}` : ''
	$: appSettings = `${brightness} ${contrast}`
	$: layoutContext = `${container} ${breakpoint}`
</script>

{#if !isPage}
	<article class={`l:stack card:xl`}>
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:sm">{title} API 🔗</svelte:element>
		</a>
		<div class={container}>
			<svelte:component this={ApiElement[category]} {isPage} {title} {component} />
		</div>
	</article>
{:else}
	<header class="header-page">
		<h1>{title}</h1>
	</header>
	<article class="l:sidebar xs align:end">
		<main class={`l:main card:xl inset ${appSettings}`}>
			<div class={layoutContext}>
				<svelte:component this={ApiElement[category]} {isPage} {title} {component} />
			</div>
		</main>
		<aside class="l:side">
			<Api {title} {category} {data} />
		</aside>
	</article>
{/if}
