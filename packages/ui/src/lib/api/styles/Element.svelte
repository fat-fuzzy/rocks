<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'
	import type {StylesApi} from './styles-api'

	import {onDestroy} from 'svelte'

	import * as ui from '$stores/ui'
	import {initStyles} from './styles-api'
	import {getProps} from '$lib/api/fixtures/js/fixtures-api'

	import Api from './Api.svelte'
	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import Graphics from './Graphics.svelte'

	export let actionPath: string | undefined = undefined
	export let redirect: string | undefined = undefined

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let path = ''
	export let component: ComponentType
	export let category = ''
	export let color = 'primary:light'
	export let page = ''
	export let props: any = getProps({category, component: title}) || {}
	props.page = page

	export let stylesApi: StylesApi = initStyles()

	let ApiElement: {[category: string]: ComponentType} = {
		tokens: Token,
		blocks: Block,
		layouts: Layout,
		recipes: Recipe,
		graphics: Graphics,
	}

	let background = ''
	let container = ''
	let size = '' // Container size
	let status = ''
	let contextClasses = ''

	let sharedOptions = {
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
	$: sharedOptions.container = styles.shared?.container.container ?? sharedOptions.container
	$: sharedOptions.size = styles.shared?.container.size ?? sharedOptions.size

	// App settings (user controlled)
	//== App settings (user controlled)
	$: brightness = settings.app.brightness
	$: background = settings.app.contrast
	// Container options
	// - [container + size] work together
	$: container = styles.shared?.container.container ?? container
	$: size = styles.shared?.container.size ?? size
	$: status = styles.blocks?.element.status ?? status

	$: contextClasses = `${sharedOptions.size}`
	$: containerClasses = `l:${container}:${size} content ${contextClasses}`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

{#if isPage}
	{@const props = getProps({category, component: title})}
	<article class="l:sidebar:xs">
		<section class={`l:main card:xl inset ${brightness} bg:${background} `}>
			<div class={containerClasses}>
				{#if props?.statuses}
					{@const currentProps = props.statuses.find((p) => p.case === status) || {}}
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
						{props}
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
					{#if category === 'tokens' || category === 'graphics'}
						<div class="card:lg text:center">
							<p class={`font:xl`}>🐰</p>
							<p class={`font:md`}>Coming soon!</p>
						</div>
					{:else if category === 'recipes'}
						<div class="drop w:full bg:polar ui:menu">
							<Api categories={['shared']} {title} {path} {actionPath} {redirect} />
						</div>
					{:else}
						<div class="drop w:full bg:polar ui:menu">
							<Api categories={[category]} {title} {path} {actionPath} {redirect} />
						</div>
					{/if}
				</details>
				<!-- <section id={`${category}-${title}-classes`}>
			<details class={`l:stack:md`}>
				<summary class={`card:sm box:${color} bg:${color}`}>Classes</summary>
				<div class="drop">
							<Api categories={[category]} {title} {path} {redirect} />
				</div>
			</details>
		</section>

				<details id={`${category}-${title}-doc`} class="l:stack:lg" open>
					<summary class={`card:xs bg:${color} box:primary:light`}>Description</summary>
					<div class="drop w:full">
						<div class="card:lg text:center">
							{#if content}
								{@html content.html}
							{:else}
								<p class={`font:xl`}>🐰</p>
								<p class={`font:md`}>Coming soon!</p>
							{/if}
						</div>
					</div>
				</details> -->
			</div>
		</section>
	</article>
{:else}
	{@const props = getProps({category, component: title})}
	<article
		id={`card-${title}`}
		class={`box ${brightness} bg:${background} l:stack ui:${title.toLowerCase()}`}
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
			{#if props?.statuses}
				{@const currentProps = props.statuses.find((p) => p.case === status) || {}}
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
					{props}
					{actionPath}
					redirect={path}
					settings={ui}
					id={`ui-${title}`}
				/>
			{/if}
		</div>
	</article>
{/if}
