<script lang="ts">
	import type {Snippet} from 'svelte'
	import {getContext} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {PlaybookActor} from '$lib/api/actor.svelte'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'
	import Element from './Element.svelte'

	import {getPlaybookTab, getDocTab} from '$lib/props'
	import {page} from '$app/state'

	const {EscapeHtml} = ui.headless
	const {PageRails} = ui.content
	const {Magic} = ui.blocks

	type Props = {
		category: any // TODO: fix types
		markdowns: any
		content: any
		path: string
		depth: number
		isPage: boolean
		color?: string
		size?: string
		layout?: string
		formaction?: string
		actionPath?: string
		children?: Snippet
		footer: Snippet
	}

	let {
		category,
		content,
		path,
		depth = 1,
		isPage = true,
		size = 'md',
		color = 'primary',
		layout = 'switcher',
		formaction,
		actionPath,
		children,
		footer,
	}: Props = $props()

	let playbookActor: PlaybookActor = getContext('playbookActor')
	let {settings} = $derived(playbookActor.app)
	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let titleDepth = $derived(Number(depth) + 1)
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
	const components: {category: string; items: any}[] = [
		{category: 'tokens', items: ui.tokens},
		{category: 'blocks', items: ui.blocks},
		{category: 'layouts', items: ui.layouts},
		{category: 'recipes', items: ui.recipes},
	]

	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let componentNames = $derived(Object.keys(items))
	//== App settings (user controlled)
	let brightness = $derived(settings.brightness || '')
	let contrast = $derived(settings.contrast || '')
	let surfaceClass = $derived(`surface:0:neutral`)
	let settingsClasses = $derived(
		`settings:${brightness}:${contrast} ${surfaceClass}`,
	)
	let layoutClass = $derived(
		category === 'tokens'
			? `l:stack:${size}`
			: category === 'recipes'
				? `l:${layout}:lg`
				: `l:${layout}:${size}`,
	)
	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)
</script>

{#snippet categoryElements()}
	{#each componentNames as name}
		{@const SpecifiedElement = items[name]}
		<article
			id={`ravioli-${title}`}
			class={`variant:bare w:auto ui:${name.toLowerCase()} ${settingsClasses}`}
		>
			<a
				href={`${link}/${name}`}
				class="title ravioli:sm size:sm l:flex emoji:link surface:1:primary align:center"
			>
				<svelte:element this={`h${String(depth)}`} class="link font:sm">
					{name}
				</svelte:element>
			</a>
			<Element
				title={name}
				{path}
				{category}
				{SpecifiedElement}
				{formaction}
				{actionPath}
			/>
		</article>
	{/each}
{/snippet}

{#snippet comingSoon()}
	<div class="ravioli:lg text:center">
		<p class={`font:xl`}>🐰</p>
		<p class={`font:md`}>Coming soon!</p>
	</div>
{/snippet}

{#if isPage}
	<PageRails
		{title}
		{description}
		path={page.url.pathname}
		hash={page.url.hash}
		nav={pageNav}
		size="sm"
	>
		{#snippet main()}
			<div class="l:text:md margin:auto">
				<h2 id="doc">Doc</h2>
			</div>
			<EscapeHtml
				id="doc"
				html={content.html}
				size="md"
				margin="auto"
				element="section"
			/>
			<section class="maki:block size:2xl">
				<div class="l:text:lg maki:auto size:xl">
					<Magic spell="bleu" uno="magic" due="sparkles" size="md" grow={true}>
						<h2 id="playbook" class="w:full text:center">Playbook</h2>
					</Magic>
				</div>
				<div class={`media ${layoutClass}`}>
					{@render categoryElements()}
				</div>
			</section>

			{#if footer}
				{@render footer()}
			{/if}
		{/snippet}

		{#snippet aside()}
			<div class="l:stack:md">
				{#key category}
					<PropsDoc meta={content.meta} />
					<PropsDemo {path} meta={content.meta} categories={[category]} />
				{/key}
			</div>
		{/snippet}
	</PageRails>
{:else}
	<section class="l:text:lg snap:start">
		<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
			{category}
		</svelte:element>
		{#if children}
			{@render children()}
		{:else}
			{@render comingSoon()}
		{/if}

		<details class={`l:stack:md ${size}`}>
			<summary
				class={`color:${color} variant:outline ravioli:2xs emoji:${category}`}
			>
				{category}
			</summary>
			<div class={layoutClass}>
				{@render categoryElements()}
			</div>
		</details>
	</section>
{/if}
