<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import Api from './Api.svelte'
	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Composition from './Composition.svelte'
	import {currentStyles, theme} from '$lib/stores/api'
	import {getProps} from '$lib/api/fixtures/js/fixtures-api'
	import {themes} from '$types/constants.js'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType

	export let category = ''
	export let color = 'primary:light' // TODO: expose breakpoint too
	export let page = ''
	export let props: any = getProps({category, component: title}) || {}
	props.page = page

	let ApiElement: {[category: string]: ComponentType} = {
		tokens: Token,
		blocks: Block,
		compositions: Composition,
		layouts: Layout,
	}

	let styles: StyleTree
	let background = ''
	let container = ''
	let brightness = themes[$theme]
	let size = '' // Container size
	let useCase = ''

	$: styles = $currentStyles
	// App settings (user controlled)
	//== App settings (user controlled)
	$: brightness = styles.app?.settings.brightness || brightness
	$: background = styles.app?.settings.contrast ?? background
	// Container options
	// - [container + size] work together
	$: container = styles.shared?.container.container ?? container
	$: size = styles.shared?.container.size ?? size
	$: useCase = styles.blocks?.element.status ?? useCase

	$: containerContext = `l:${container}:${size}`
</script>

{#if !isPage}
	{@const props = getProps({category, component: title})}
	<article class={`card:lg box ${brightness} bg:${background} l:stack md`}>
		<header class={`card:sm`}>
			<a class="card:sm w:full l:switcher font:lg emoji:link" href={`${path}/${title}`}>
				<svelte:element this={`h${String(depth)}`} class="link font:xl">
					{title}
				</svelte:element>
			</a>
		</header>
		{#if props?.useCases}
			{@const currentProps = props.useCases.find((p) => p.case === useCase) || {}}
			<svelte:component
				this={ApiElement[category]}
				{isPage}
				{title}
				{component}
				props={currentProps}
			/>
		{:else}
			<svelte:component this={ApiElement[category]} {isPage} {title} {component} {props} />
		{/if}
	</article>
{:else}
	{@const props = getProps({category, component: title})}
	<article class="l:sidebar:xs">
		<section class={`l:main card:xl inset ${brightness} bg:${background}`}>
			<div class={containerContext}>
				{#if props?.useCases}
					{@const currentProps = props.useCases.find((p) => p.case === useCase) || {}}
					<svelte:component
						this={ApiElement[category]}
						{isPage}
						{title}
						{component}
						props={currentProps}
					/>
				{:else}
					<svelte:component this={ApiElement[category]} {isPage} {title} {component} {props} />
				{/if}
			</div>
		</section>
		<section class="l:side">
			<div class="l:stack:lg">
				<details id={`${category}-${title}-api`} class={`l:stack:md`}>
					<summary class={`card:xs bg:${color}`}>Style Props</summary>
					{#if category !== 'compositions' && category !== 'tokens'}
						<div class="drop w:full">
							<Api {title} {category} />
						</div>
					{:else}
						<div class="card:lg text:center">
							<p class={`font:xl`}>🐰</p>
							<p class={`font:md`}>Coming soon!</p>
						</div>
					{/if}
				</details>
				<!-- <section id={`${category}-${title}-classes`}>
				<details class={`l:stack:md`}>
					<summary class={`card:sm box:${color} bg:${color}`}>Classes</summary>
					<div class="drop">
						<Api {category} {title} />
					</div>
				</details>
			</section> -->

				<details id={`${category}-${title}-doc`} class={`l:stack:md`} open>
					<summary class={`card:xs bg:${color}`}>Description</summary>
					<div class="drop w:full">
						<div class="card:lg text:center">
							<p class={`font:xl`}>🐰</p>
							<p class={`font:md`}>Coming soon!</p>
						</div>
					</div>
				</details>
			</div>
		</section>
	</article>
{/if}
