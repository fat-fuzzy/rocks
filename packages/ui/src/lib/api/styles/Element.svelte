<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Composition from './Composition.svelte'
	import {currentStyles} from '$lib/stores/api'
	import {getProps} from '$lib/api/fixtures/js/fixtures-api'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType

	export let category = 'app'
	export let page = ''
	export let props: any = {}
	props.page = page

	let ApiElement: {[category: string]: ComponentType} = {
		layouts: Layout,
		blocks: Block,
		compositions: Composition,
	}

	let styles: StyleTree
	let brightness = ''
	let contrast = ''
	let container = ''
	let size = '' // Container size

	$: {
		styles = $currentStyles
		// App settings (user controlled)
		brightness = styles.app?.settings.brightness ?? brightness
		contrast = styles.app?.settings.contrast ?? contrast
		// Container options
		// - [container + size] work together
		container = styles.shared?.context.container ?? container
		size = styles.shared?.context.size ?? size
	}
	$: appSettings = `${brightness} ${contrast}`
	$: containerContext = category !== 'app' ? `l:${container}:${size}` : 'l:burrito:xs'
	$: color = 'primary:lighter'
</script>

{#if !isPage}
	{@const props = getProps({category, component: title})}
	<article class="l:stack lg">
		<header class={`card:md text:center bg:${color}`}>
			<a class="card:sm" href={`${path}/${title}`}>
				<svelte:element this={`h${String(depth)}`} class="link font:sm">
					<span class="font:xs">🔗</span>&nbsp;{title}
				</svelte:element>
			</a>
		</header>
		<svelte:component this={ApiElement[category]} {isPage} {title} {component} {props} />
	</article>
{:else}
	{@const props = getProps({category, component: title})}
	<header class="header-page">
		<h1>{title}</h1>
	</header>
	<article class="l:sidebar xs align:end">
		<main class={`l:main card:xl inset ${appSettings}`}>
			<div class={containerContext}>
				<svelte:component this={ApiElement[category]} {isPage} {title} {component} {props} />
			</div>
		</main>
		<aside class="l:side">
			<Api {title} {category} />
		</aside>
	</article>
{/if}
