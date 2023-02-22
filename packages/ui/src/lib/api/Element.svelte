<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {page} from '$app/stores'
	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import type {StyleTree} from './styles-api'
	import {selectedStore} from '../stores/api'

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

	let selected: StyleTree
	let brightness = ''
	let contrast = ''
	let container = ''
	let size = '' // Container size

	$: {
		selected = $selectedStore
		// App settings (user controlled)
		brightness = selected.app?.settings.brightness ?? brightness
		contrast = selected.app?.settings.contrast ?? contrast
		// Container options
		// - [container + size] work together
		container = selected.shared?.context.container ?? container
		size = selected.shared?.context.size ?? size
	}
	$: appSettings = `${brightness} ${contrast}`
	$: containerContext = category !== 'app' ? `l:${container}:${size}` : 'l:burrito:xs'
</script>

{#if !isPage}
	<article class={`card:xl`}>
		<header>
			<a class="primary header" href={`${path}/${title}`}>
				<svelte:element this={`h${String(depth)}`} class="font:sm">
					<span class="font:xs">🔗</span>&nbsp;{title}
				</svelte:element>
			</a>
		</header>
		<div class="card l:freeze:burrito:xs">
			<svelte:component this={ApiElement[category]} {isPage} {title} {component} />
		</div>
	</article>
{:else}
	<header class="header-page">
		<h1>{title}</h1>
	</header>
	<article class="l:sidebar xs align:end">
		<main class={`l:main card:xl inset ${appSettings}`}>
			<div class={containerContext}>
				<svelte:component this={ApiElement[category]} {isPage} {title} {component} />
			</div>
		</main>
		<aside class="l:side">
			<Api {title} {category} />
		</aside>
	</article>
{/if}
