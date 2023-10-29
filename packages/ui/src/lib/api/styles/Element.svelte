<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import Api from './Api.svelte'
	import Token from './Token.svelte'
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

	export let category = ''
	export let page = ''
	export let props: any = {}
	props.page = page

	let ApiElement: {[category: string]: ComponentType} = {
		tokens: Token,
		blocks: Block,
		compositions: Composition,
		layouts: Layout,
	}

	let styles: StyleTree
	let brightness = ''
	let background = ''
	let container = ''
	let size = '' // Container size

	$: styles = $currentStyles
	// App settings (user controlled)
	$: brightness = styles.app?.settings.brightness ?? brightness
	$: background = styles.app?.settings.contrast ?? background
	// Container options
	// - [container + size] work together
	$: container = styles.shared?.container.container ?? container
	$: size = styles.shared?.container.size ?? size

	$: containerContext = `l:${container}:${size}`
</script>

{#if !isPage}
	{@const props = getProps({category, component: title})}
	<article class={`card:lg box ${brightness} bg:${background} l:stack md`}>
		<header class={`card:sm`}>
			<a class="card:sm w:full" href={`${path}/${title}`}>
				<svelte:element this={`h${String(depth)}`} class="link font:sm">
					<span class="font:xs">🔗</span>&nbsp;{title}
				</svelte:element>
			</a>
		</header>
		<svelte:component this={ApiElement[category]} {isPage} {title} {component} {props} />
	</article>
{:else}
	{@const props = getProps({category, component: title})}
	<article class="l:sidebar:xs">
		<main class={`l:main card:xl inset ${brightness} bg:${background}`}>
			<div class={containerContext}>
				<svelte:component this={ApiElement[category]} {isPage} {title} {component} {props} />
			</div>
		</main>
		<aside class="l:side">
			<Api {title} {category} />
		</aside>
	</article>
{/if}
