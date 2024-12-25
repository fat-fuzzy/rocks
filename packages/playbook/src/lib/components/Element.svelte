<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {StylesApi} from '$lib/api/styles.api'
	import type {Meta} from '$types'
	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import PlaybookStore from '$lib/api/store.svelte'
	import {getPlaybookTab, getDocTab} from '$lib/props'

	import Api from '$lib/components/Api.svelte'
	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'

	const {Tabs} = ui.drafts

	type Props = {
		title: string
		depth?: number
		isPage?: boolean
		path?: string
		SpecifiedElement: any // TODO: fix types
		formaction?: string
		actionPath?: string
		redirect?: string
		category?: string
		color?: string
		meta: Meta
		children?: Snippet
	}

	let {
		title,
		isPage = false,
		depth = 0,
		path = '',
		SpecifiedElement,
		formaction,
		actionPath,
		redirect,
		category = '',
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

	let sectionContainer = $derived(
		category === 'blocks'
			? 'col:center'
			: category !== 'tokens'
				? `l:${container}:${size}`
				: '',
	)
	let articleContainer = $derived(
		category === 'blocks'
			? 'col:center'
			: category !== 'tokens' &&
				  category !== 'blocks' &&
				  title !== 'Burrito' &&
				  title !== 'Stack' &&
				  title !== 'Switcher'
				? `l:${container}:${size}`
				: '',
	)
	let surfaceClass = $derived(`surface:0:neutral`)
	let settingsClasses = $derived(
		`settings:${brightness}:${contrast} ${surfaceClass}`,
	)
	let sectionClasses = $derived(`l:main stage card:xl inset ${settingsClasses}`)
	let containerClasses = $derived(isPage ? sectionContainer : articleContainer)

	let GenericElement = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookStore.getElementFixtures({category, component: title}),
	)
	let statusFixures = $derived(
		fixtures?.status ? fixtures.status.find((p) => p.value === status) : {},
	)
	let currentProps = $derived(fixtures?.status ? statusFixures : fixtures)
	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)

	let tabs = [
		{
			...getDocTab(),
			content: docContent,
			labelledBy: title,
		},
		{
			...getPlaybookTab(),
			content: playbookContent,
			labelledBy: title,
		},
	]
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
			{formaction}
			{actionPath}
			{redirect}
			{...settings}
			id={title}
		/>
	</div>
{/snippet}

{#snippet playbookContent()}
	<div class="l:sidebar:md media end">
		<aside class="l:side l:stack:md">
			{#key title}
				<PropsDemo
					{path}
					{actionPath}
					{redirect}
					color="accent"
					{meta}
					categories={[category]}
				/>
			{/key}
		</aside>
		<div class={sectionClasses}>
			{@render renderElement()}
		</div>
	</div>
{/snippet}

{#snippet docContent()}
	<div class="l:sidebar:md">
		<div class="l:main">
			{#if children}
				{@render children()}
			{/if}
		</div>
		<aside class="l:side l:stack:md">
			<PropsDoc {meta} />
		</aside>
	</div>
{/snippet}

{#if isPage}
	<Tabs id="playbook-tabs" {tabs} {path} />
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
