<script lang="ts">
	import {onMount, type ComponentType} from 'svelte'
	import {page} from '$app/stores'
	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import type {StyleTree} from './styles-api'
	import {selectedStore} from '../stores/api'

	export let uiState: StyleTree // TODO: figure out how to avoid this prop drilling

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType

	export let category = $page.params.category || 'app'
	// export let families = []

	let ApiElement: {[category: string]: ComponentType} = {
		layouts: Layout,
		blocks: Block,
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)
	let selected = uiState

	let brightness = ''
	let contrast = ''
	let container = ''
	let breakpoint = ''
	let layout = ''
	let size = ''

	// $: families = Object.keys(category)
	$: {
		selected = $selectedStore
		brightness = selected.app?.settings.brightness ?? brightness
		contrast = selected.app?.settings.contrast ?? contrast
		container = selected.shared?.context.container
			? `l:${selected.shared?.context.container} inset`
			: ''
		layout = selected.shared?.context.layout ? `l:${selected.shared?.context.layout}` : ''
		breakpoint = selected.shared?.context.breakpoint
			? `bp:${selected.shared?.context.breakpoint}`
			: ''
		size = selected.shared?.context.size ?? ''
	}
	$: appSettings = `${brightness} ${contrast}`
	$: layoutContext = `${container} ${breakpoint}`
</script>

{#if !isPage}
	<article class={`l:stack card:xl`}>
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:sm">
				<span class="font:xs">🔗</span>&nbsp;{title}
			</svelte:element>
		</a>
		<div class={layoutContext}>
			<svelte:component
				this={ApiElement[category]}
				{isPage}
				{title}
				{component}
				uiState={selected}
			/>
		</div>
	</article>
{:else}
	<header class="header-page">
		<h1>{title}</h1>
	</header>
	<article class="l:sidebar xs align:end">
		<main class={`l:main card:xl inset ${appSettings}`}>
			<div class={layoutContext}>
				<svelte:component
					this={ApiElement[category]}
					{isPage}
					{title}
					{component}
					uiState={selected}
				/>
			</div>
		</main>
		<aside class="l:side">
			<Api {title} {category} uiState={selected} />
		</aside>
	</article>
{/if}
