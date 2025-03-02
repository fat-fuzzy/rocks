<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {Meta} from '$types'
	import {getContext} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {PlaybookActor} from '$lib/api/actor.svelte'
	import {getPlaybookTab, getDocTab} from '$lib/props'

	import Token from './Token.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import Recipe from './Recipe.svelte'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'

	const {PageTabs} = ui.drafts

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
	let playbookActor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(playbookActor.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')
	let {settings} = $derived(playbookActor.app)

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
	let sectionClasses = $derived(`l:main stage ravioli:xl ${settingsClasses}`)
	let containerClasses = $derived(isPage ? sectionContainer : articleContainer)

	let GenericElement = $derived(ApiElement[category])
	let fixtures = $derived(
		playbookActor.getElementFixtures({category, component: title}),
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

	let description = $derived(`${title} | Doc`)

	let header = $derived({
		title,
		main: headerMain,
	})
</script>

{#snippet renderElement()}
	<div class={`ravioli:lg ${containerClasses}`}>
		<GenericElement
			{isPage}
			{path}
			{title}
			{SpecifiedElement}
			props={currentProps}
			{formaction}
			{actionPath}
			id={title}
		/>
	</div>
{/snippet}

{#snippet playbookContent()}
	<h2 id="playbook">Playbook</h2>
	<div class="l:sidebar:sm media end">
		<aside class="l:side l:stack:md">
			{#key title}
				<PropsDemo
					{path}
					{actionPath}
					{redirect}
					{meta}
					categories={[category]}
				/>
			{/key}
		</aside>
		<div id={`tabs-${category}-playbook`} class={`l:main`}>
			<div class={sectionClasses}>
				{@render renderElement()}
			</div>
		</div>
	</div>
{/snippet}

{#snippet docContent()}
	<div class="l:sidebar:sm">
		<div id={`tabs-${category}-doc`} class="l:main">
			{#if children}
				{@render children()}
			{/if}
		</div>
		<aside class="l:side l:stack:md">
			<PropsDoc {meta} />
		</aside>
	</div>
{/snippet}

{#snippet headerMain()}
	<h1>{title}</h1>
{/snippet}

{#if isPage}
	<PageTabs pageName="UI" {title} {description} {path} {tabs} {header} size="sm"
	></PageTabs>
{:else}
	<article
		id={`ravioli-${title}`}
		class={`variant:bare w:auto ui:${title.toLowerCase()} ${settingsClasses}`}
	>
		<a
			href={`${link}/${title}`}
			class="title ravioli:2xs l:flex emoji:link surface:1:primary align:center"
		>
			<svelte:element this={`h${String(depth)}`} class="link font:xs">
				{title}
			</svelte:element>
		</a>
		{@render renderElement()}
	</article>
{/if}
