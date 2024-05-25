<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from '$lib/api/components/styles.api'
	import type {StyleTree} from '$lib/api/components/styles.types'
	import type {Meta} from '$lib/api/props/types'

	import {onDestroy, getContext} from 'svelte'

	import * as ui from '$stores/ui'
	import {getFixtures} from '$lib/api/fixtures/js'

	import Api from './Api.svelte'
	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import Graphics from './Graphics.svelte'

	type Props = {
		title: string
		depth?: number
		isPage?: boolean
		path?: string
		component: ComponentType
		actionPath?: string
		redirect?: string
		category?: string
		color?: string
		meta: Meta
	}

	let {
		title,
		isPage = false,
		depth = 0,
		path = '',
		component,
		actionPath,
		redirect,
		category = '',
		color = 'primary:light',
		meta,
	}: Props = $props()

	// TODO: fix types
	let ApiElement: {[category: string]: any} = {
		tokens: Token,
		blocks: Block,
		layouts: Layout,
		recipes: Recipe,
		graphics: Graphics,
	}

	const stylesApi: StylesApi = getContext('stylesApi')
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
				styles = stylesApi.getStyleTree()
			}
		}),
	]
	// App settings (user controlled)
	//== App settings (user controlled)
	let brightness = $derived(settings.app.brightness)
	let contrast = $derived(settings.app.contrast || '')

	//== Layout settings (user controlled)
	// Container options
	// - [container + size] work together
	let container = $derived(styles.layouts?.container.container ?? '')
	let size = $derived(styles.layouts?.container.size ?? '') // Container size
	let status = $derived(styles.blocks?.element.status ?? '')

	let containerClasses = $derived(`l:${container}:${size} content`)
	let fixtures = $derived(getFixtures({category, component: title}))
	let categories = $derived(
		meta.props_style ? Object.keys(meta.props_style) : undefined,
	)

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

{#if isPage}
	<article class="l:sidebar:xs">
		<section class={`l:main card:xl inset ${brightness} bg:${contrast} `}>
			<div class={containerClasses}>
				{#if fixtures?.status}
					{@const currentProps =
						fixtures.status.find((p) => p.case === status) || {}}
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
				<details id={`${category}-${title}-api`} class="l:stack:md" open>
					<summary class={`box:${color} bg:${color}`}>Props</summary>
					{#if categories}
						<div class="drop w:full bg:polar ui:menu">
							<Api {categories} {path} {actionPath} {redirect} {meta} />
						</div>
					{:else}
						<div class="card:lg text:center">
							<p class={`font:xl`}>🐰</p>
							<p class={`font:md`}>Coming soon!</p>
						</div>
					{/if}
				</details>
			</div>
		</section>
	</article>
{:else}
	<article
		id={`card-${title}`}
		class={`box ${brightness} bg:${contrast} l:stack ui:${title.toLowerCase()}`}
	>
		<header>
			<a
				class="title card:sm w:full l:switcher:xs emoji:link outline primary align:center"
				href={`${path}/${title}`}
			>
				<svelte:element this={`h${String(depth)}`} class="link font:lg">
					{title}
				</svelte:element>
			</a>
		</header>
		<div class="content">
			{#if fixtures?.status}
				{@const currentProps =
					fixtures.status.find((p) => p.case === status) || {}}
				<svelte:component
					this={ApiElement[category]}
					{isPage}
					{path}
					{title}
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
					{path}
					{title}
					{component}
					props={fixtures}
					{actionPath}
					{redirect}
					settings={ui}
					id={`ui-${title}`}
				/>
			{/if}
		</div>
	</article>
{/if}
