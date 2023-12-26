<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'
	import type {StylesApi} from '$lib/api/styles'
	import type {Meta} from '$lib/api/props/types'

	import {onDestroy} from 'svelte'

	import * as ui from '$stores/ui'
	import {initStyles} from '$lib/api/styles'
	import {getFixtures} from '$lib/api/fixtures/js'

	import Api from './Api.svelte'
	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import Graphics from './Graphics.svelte'

	export let actionPath: string | undefined
	export let redirect: string | undefined

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType
	export let category = ''
	export let color = 'primary:light'
	export let stylesApi: StylesApi = initStyles()
	export let meta: Meta

	let ApiElement: {[category: string]: ComponentType} = {
		tokens: Token,
		blocks: Block,
		layouts: Layout,
		recipes: Recipe,
		graphics: Graphics,
	}

	let contrast = ''
	let container = ''
	let size = '' // Container size
	let status = ''
	let contextClasses = ''

	let containerOptions = {
		container: '',
		size: '',
	}

	let styles: StyleTree = stylesApi.getStyleTree()
	let settings = styles.app
	const stores = [
		ui.app.subscribe((value) => {
			if (value) {
				settings = {app: value}
			}
		}),
		ui.styles.subscribe((value) => {
			if (value) {
				styles = value
			}
		}),
	]

	//== Shared settings (user controlled)
	// Container options
	// - [container + size] work together
	$: containerOptions.container = styles.layouts?.container.container ?? containerOptions.container
	$: containerOptions.size = styles.layouts?.container.size ?? containerOptions.size

	// App settings (user controlled)
	//== App settings (user controlled)
	$: brightness = settings.app.brightness
	$: contrast = settings.app.contrast || contrast
	// Container options
	// - [container + size] work together
	$: container = styles.layouts?.container.container ?? container
	$: size = styles.layouts?.container.size ?? size
	$: status = styles.blocks?.element.status ?? status

	$: contextClasses = `${containerOptions.size}`
	$: containerClasses = `l:${container}:${size} content ${contextClasses}`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

{#if isPage}
	{@const fixtures = getFixtures({category, component: title})}
	<article class="l:sidebar:xs">
		<section class={`l:main card:xl inset ${brightness} bg:${contrast} `}>
			<div class={containerClasses}>
				{#if fixtures?.status}
					{@const currentProps = fixtures.status.find((p) => p.case === status) || {}}
					<svelte:component
						this={ApiElement[category]}
						{isPage}
						{title}
						{path}
						{component}
						{stylesApi}
						props={currentProps}
						{actionPath}
						{redirect}
						settings={ui}
						id={`ui-${title}`}
					/>
				{:else}
					<svelte:component
						this={ApiElement[category]}
						{isPage}
						{title}
						{path}
						{component}
						props={fixtures}
						{actionPath}
						{redirect}
						settings={ui}
						id={`ui-${title}`}
					/>
				{/if}
			</div>
		</section>
		<section class="l:side">
			<div class="l:stack:lg">
				<details id={`${category}-${title}-api`} class="l:stack:lg" open>
					<summary class={`card:xs bg:${color} box:primary:light`}>Style Props</summary>
					<div class="drop w:full bg:polar ui:menu">
						<Api categories={[category]} {path} {actionPath} {redirect} {meta} />
					</div>
				</details>
				<!-- <section id={`${category}-${title}-classes`}>
			<details class={`l:stack:md`}>
				<summary class={`card:sm box:${color} bg:${color}`}>Classes</summary>
				<div class="drop">
							<Api categories={[category]} {title} {path} {redirect} />
				</div>
			</details>
		</section>-->
			</div>
		</section>
	</article>
{:else}
	{@const fixtures = getFixtures({category, component: title})}
	<article
		id={`card-${title}`}
		class={`box ${brightness} bg:${contrast} l:stack ui:${title.toLowerCase()}`}
	>
		<header>
			<a
				class="title card:md w:full l:switcher:xs emoji:link outline primary:light"
				href={`${path}/${title}`}
			>
				<svelte:element this={`h${String(depth)}`} class="link font:lg">
					{title}
				</svelte:element>
			</a>
		</header>
		<div class="content">
			{#if fixtures?.status}
				{@const currentProps = fixtures.status.find((p) => p.case === status) || {}}
				<svelte:component
					this={ApiElement[category]}
					{isPage}
					{path}
					{title}
					{component}
					{stylesApi}
					props={currentProps}
					{actionPath}
					redirect={path}
					settings={ui}
					id={`ui-${title}`}
				/>
			{:else}
				<svelte:component
					this={ApiElement[category]}
					{isPage}
					{path}
					{title}
					{component}
					props={fixtures}
					{actionPath}
					redirect={path}
					settings={ui}
					id={`ui-${title}`}
				/>
			{/if}
		</div>
	</article>
{/if}
