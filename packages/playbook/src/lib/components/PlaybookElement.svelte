<script lang="ts">
	import type {Meta} from '$types'
	import {getContext} from 'svelte'
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
	const {Magic} = ui.blocks

	const {EscapeHtml} = ui.headless

	type Props = {
		category: string
		content: {html: string; meta: unknown} // TODO: fix types
		title: string
		path: string
		context: {
			app: {
				brightness?: string
				contrast?: string
			}
			page?: {
				reveal: string
				title?: string
			}
		}
		formaction?: string
		actionPath?: string
		redirect?: string
	}
	let {
		category,
		content,
		title,
		path = '',
		context,
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
	let styles = $derived(playbookActor.styles)
	let blockStyles = $derived(styles.blocks?.families?.block || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')

	//== App settings (user controlled)
	let spell = $derived(context.app.brightness === 'day' ? 'dawn' : 'dusk')
	//== Layout settings (user controlled)
	// Container options
	// - [container + size] work together
	let container = $derived(containerStyles.container ?? '')
	let size = $derived(containerStyles.size ?? '') // Container size
	let status = $derived(blockStyles.status ?? '')

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

	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)
</script>

<PageRails
	{title}
	{description}
	{path}
	nav={pageNav}
	size="sm"
	context={context.page}
	layout="tram"
>
	{#snippet main()}
		<div class="l:stack:2xl">
			<EscapeHtml id="doc" html={content.html} size="md" font="md" />

			<section id="playbook" class="l:stack:2xl">
				<div class="w:full l:flex justify:center">
					<div class="l:text:lg">
						<Magic
							id="playbook-heading"
							{spell}
							uno="magic"
							due="sparkles"
							size="md"
							grow={true}
						>
							<h2 class="w:full text:center">
								{category === 'raw' ? 'Template' : 'Playbook'}
							</h2>
						</Magic>
					</div>
				</div>
				{#if category === 'raw'}
					<div class="l:center size:sm col:center">
						<a
							href={`${link}/${title}/template`}
							class="ravioli:xs size:xs l:flex emoji:link surface:1:primary align:center"
						>
							<svelte:element this={`h3`} class="link font:sm">
								Open {title} template
							</svelte:element>
						</a>
					</div>
				{:else}
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
				{/if}
			</section>
		</div>
	{/snippet}

	{#snippet aside()}
		<PropsDoc meta={content.meta as Meta} />
		<PropsDemo
			{path}
			{actionPath}
			{redirect}
			meta={content.meta as Meta}
			categories={[category]}
		/>
	{/snippet}
</PageRails>
