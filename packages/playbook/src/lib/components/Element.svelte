<script lang="ts">
	import type { Snippet} from 'svelte'
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'
	import type {StylesApi} from '$lib/api/styles.api'
	import type {Meta} from '$lib/props/types'

	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'

	type Props = {
		title: string
		depth?: number
		isPage?: boolean
		path?: string
		component: any // TODO: fix types
		actionPath?: string
		redirect?: string
		category?: string
		color?: string
		tab?: string
		meta: Meta
		children?: Snippet
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
		tab,
		meta,
		children,
	}: Props = $props()

	// TODO: fix types
	let ApiElement: {[category: string]: any} = {
		tokens: Token,
		blocks: Block,
		layouts: Layout,
		recipes: Recipe,
	}

	const stylesApi: StylesApi = getContext('stylesApi')
	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let layoutStyles = $derived(styles.layouts.layout)
	let containerStyles = $derived(styles.layouts.container)
	let settings = $derived(playbookStore.app)

	//== App settings (user controlled)
	let brightness = $derived(settings.brightness || '')
	let contrast = $derived(settings.contrast || '')

	//== Layout settings (user controlled)
	// Container options
	// - [container + size] work together
	let container = $derived(containerStyles.container ?? '')
	let size = $derived(containerStyles.size ?? '') // Container size
	let status = $derived(elementStyles.status ?? '')

	let containerClasses = $derived(
		category !== 'tokens' && category !== 'blocks'
			? `l:${container}:${size}`
			: ''
	)
	let settingsClasses = $derived(`settings:${brightness}:${contrast}`)
	let sectionClasses = $derived(`l:main card:xl inset ${settingsClasses} surface:1:neutral`)

	let componentType = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookStore.getElementFixtures({category, component: title}),
	)
	let statusFixures = $derived(fixtures?.status ? fixtures.status.find((p) => p.case === status) : {})
	let currentProps = $derived(fixtures?.status ? statusFixures : fixtures)
	let categories = $derived(
		meta?.props_style ? Object.keys(meta.props_style) : ['app'],
	)
	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)
</script>

{#snippet renderElement()}
	<div class={containerClasses}>
		<svelte:component
			this={componentType}
			{isPage}
			{path}
			{title}
			{component}
			{stylesApi}
			props={currentProps}
			{actionPath}
			{redirect}
			{...settings}
			{...elementStyles}
			{...layoutStyles}
			id={`ui-${title}`}
		/>
	</div>
{/snippet}

{#if isPage}
	<div class="l:sidebar:md">
		{#if tab === 'demo'}
			<section class={sectionClasses}>
				{@render renderElement()}
			</section>
			<aside class="l:side l:stack:md w:full">
				<PropsDemo
					{path}
					{actionPath}
					{redirect}
					color = 'primary'
					{meta}
					{categories}
				/>
			</aside>
		{:else if tab === 'doc'}
			<section class="l:main">
				{#if children}
					{@render children()}
				{/if}
			</section>
			<aside class="l:side l:stack:md w:full">
				<PropsDoc {meta} />
			</aside>
		{/if}
	</div>
{:else}
	<article
		id={`card-${title}`}
		class={`card variant:outline l:stack ui:${title.toLowerCase()} bg:inherit`}
	>
		<header>
			<a
				class="title card:2xs w:full l:switcher:xs emoji:link outline surface:1:primary align:center"
				href={`${link}/${title}`}
			>
				<svelte:element this={`h${String(depth)}`} class="link font:md">
					{title}
				</svelte:element>
			</a>
		</header>
		<div class={`${containerClasses} ${settingsClasses}`}>
			{@render renderElement()}
		</div>
	</article>
{/if}
