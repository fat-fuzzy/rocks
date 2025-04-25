<script lang="ts">
	import {getContext} from 'svelte'
	import {page} from '$app/state'

	import ui from '@fat-fuzzy/ui'
	import {PlaybookActor} from '$lib/api/actor.svelte'
	import {getPlaybookTab, getDocTab} from '$lib/props'

	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import Raw from './Raw.svelte'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'

	const {PageRails} = ui.content
	const {Zoomer} = ui.drafts
	const {Magic} = ui.blocks

	const {EscapeHtml} = ui.headless

	type Props = {
		category: any // TODO: fix types
		content: any
		title: string
		path: string
		formaction?: string
		actionPath?: string
		redirect?: string
	}
	let {
		category,
		content,
		title,
		path,
		formaction,
		actionPath,
		redirect,
	}: Props = $props()

	let description = $derived(`${title} | Doc`)
	let pageNav = [
		{
			...getDocTab(),
			labelledBy: category,
		},
		{
			...getPlaybookTab(),
			labelledBy: category,
		},
	]
	let categoryItems: {[name: string]: any} = {
		tokens: ui.tokens,
		blocks: ui.blocks,
		layouts: ui.layouts,
		recipes: ui.recipes,
		raw: ui.raw,
	}

	// TODO: fix types
	let ApiElement: {[category: string]: any} = {
		tokens: Token,
		blocks: Block,
		layouts: Layout,
		recipes: Recipe,
		raw: Raw,
	}
	let playbookActor: PlaybookActor = getContext('playbookActor')

	let pageContext = $derived(page.data.pageContext)
	let appContext = $derived(page.data.appContext)
	let styles = $derived(playbookActor.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')

	//== App settings (user controlled)
	let brightness = $derived(appContext.brightness || '')
	let spell = $derived(brightness === 'day' ? 'dawn' : 'dusk')
	//== Layout settings (user controlled)
	// Container options
	// - [container + size] work together
	let container = $derived(containerStyles.container ?? '')
	let size = $derived(containerStyles.size ?? '') // Container size
	let status = $derived(elementStyles.status ?? '')

	let containerClasses = $derived(
		category === 'blocks'
			? 'col:center'
			: category !== 'tokens'
				? `l:${container}:${size}`
				: '',
	)

	let GenericElement = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookActor.getElementFixtures({category, component: title}),
	)
	let statusFixures = $derived(
		fixtures?.status ? fixtures.status.find((p) => p.value === status) : {},
	)
	let currentProps = $derived(fixtures?.status ? statusFixures : fixtures)

	let SpecifiedElement = $derived(categoryItems[category][title])
</script>

<PageRails
	{title}
	{description}
	{path}
	nav={pageNav}
	size="sm"
	context={pageContext}
	layout="tram"
>
	{#snippet main()}
		<div class="l:text:md maki:auto">
			<h2 id="doc">Doc</h2>
		</div>
		<EscapeHtml id="doc" html={content.html} size="md" margin="auto" />

		<section id="playbook" class="maki:block size:2xl">
			{#if category === 'raw'}
				<Magic {spell} uno="magic" due="sparkles" size="md" grow={true}>
					<Zoomer
						{title}
						{description}
						{path}
						size="sm"
						layout="center"
						cta="Open layout"
					>
						<GenericElement children={SpecifiedElement} />
					</Zoomer>
				</Magic>
			{:else}
				<div class="l:text:lg size:xl maki:auto">
					<Magic {spell} uno="magic" due="sparkles" size="md" grow={true}>
						<h2 class="w:full text:center">Playbook</h2>
					</Magic>
				</div>
				<div class="media maki:block">
					<div class={`ravioli:lg ${containerClasses}`}>
						<GenericElement
							isPage={true}
							{path}
							{title}
							{SpecifiedElement}
							props={currentProps}
							{formaction}
							{actionPath}
							id={title}
						/>
					</div>
				</div>
			{/if}
		</section>
	{/snippet}

	{#snippet aside()}
		{#key category}
			<PropsDoc meta={content.meta} />
			<PropsDemo
				{path}
				{actionPath}
				{redirect}
				meta={content.meta}
				categories={[category]}
			/>
		{/key}
	{/snippet}
</PageRails>
