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
		SpecifiedElement: any // TODO: fix types
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
		SpecifiedElement,
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
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')
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

	let sectionContainer = $derived(category === 'blocks' ? 'col:center'
		: category !== 'tokens'
		? `l:${container}:${size}` : ''
	)
	let articleContainer = $derived(category === 'blocks' ? 'col:center'
		: category !== 'tokens' && category !== 'blocks' && title !== 'Burrito' && title !== 'Stack' && title !== 'Switcher'
		? `l:${container}:${size}` : ''
	)
	let surfaceClass = $derived( `surface:0:neutral`)
	let settingsClasses = $derived(`settings:${brightness}:${contrast} ${surfaceClass}`)
	let sectionClasses = $derived(`l:main stage card:xl inset ${settingsClasses}`)
	let containerClasses = $derived(isPage ? sectionContainer : articleContainer)

	let GenericElement = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookStore.getElementFixtures({category, component: title}),
	)
	let statusFixures = $derived(fixtures?.status ? fixtures.status.find((p) => p.case === status) : {})
	let currentProps = $derived(fixtures?.status ? statusFixures : fixtures)
	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)
</script>

{#snippet renderElement()}
	<div class={containerClasses}>
		<GenericElement
			{isPage}
			{path}
			{title}
			{SpecifiedElement}
			{stylesApi}
			props={currentProps}
			{actionPath}
			{redirect}
			{...settings}
			id={`ui-${title}`}
		/>
	</div>
{/snippet}

{#if isPage}
	<div class="l:sidebar:md">
		{#if tab === 'playbook'}
			<section class={sectionClasses}>
				{@render renderElement()}
			</section>
			<aside class="l:side l:stack:md">
				{#key title}
					<PropsDemo
						{path}
						{actionPath}
						{redirect}
						color = 'primary'
						{meta}
						categories={[category]}
					/>
				{/key}
			</aside>
		{:else if tab === 'doc'}
			<section class="l:main">
				{#if children}
					{@render children()}
				{/if}
			</section>
			<aside class="l:side l:stack:md">
				<PropsDoc {meta} />
			</aside>
		{/if}
	</div>
{:else}
	<article
		id={`card-${title}`}
		class={`card variant:bare l:stack:md w:auto ui:${title.toLowerCase()} ${settingsClasses}`}
	>
		<a
			href={`${link}/${title}`}
			class="title card:2xs l:flex emoji:link surface:1:primary align:center"
		>
			<svelte:element this={`h${String(depth)}`} class="link font:md">
				{title}
			</svelte:element>
		</a>
		{@render renderElement()}
	</article>
{/if}
