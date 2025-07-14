<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {Meta} from '$types'
	import ui from '@fat-fuzzy/ui'
	import PropsDemo from './PropsDemo.svelte'
	import PropsDoc from './PropsDoc.svelte'
	import Element from './Element.svelte'
	import {getPlaybookTab, getDocTab} from '$lib/props'

	const {EscapeHtml} = ui.headless
	const {PageRails} = ui.content
	const {Magic} = ui.blocks

	type Props = {
		category: string
		content: {html: string; meta: unknown} // TODO: fix types
		depth: number
		path: string
		isPage: boolean
		color?: string
		size?: string
		layout?: string
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
		children?: Snippet
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
		context,
		formaction,
		actionPath,
		children,
	}: Props = $props()

	let title = $derived(
		`${category.charAt(0).toUpperCase()}${category.slice(1)}`,
	)
	let titleDepth = $derived(depth + 1)
	let elementTitleDepth = $derived(titleDepth + 1)
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
	const components: {category: string; items: unknown}[] = [
		{category: 'tokens', items: ui.tokens},
		{category: 'blocks', items: ui.blocks},
		{category: 'layouts', items: ui.layouts},
		{category: 'recipes', items: ui.recipes},
		{category: 'raw', items: ui.raw},
	]

	let items = $derived(
		components.find(({category: c}) => c === category)?.items ?? [],
	)
	let componentNames = $derived(Object.keys(items))

	//== App preferences (user controlled)
	let spell = $derived(context.app.brightness === 'day' ? 'dawn' : 'dusk')
	let collectionContainer = $derived(
		category === 'blocks' ? 'l:grid:auto size:md' : 'l:grid:auto size:lg',
	)

	let link = $derived(
		path.substring(0, path.indexOf(category) + category.length),
	)
</script>

{#snippet categoryElements()}
	{#if category === 'raw'}
		<div>
			<ul class="l:grid:auto size:sm text:start unstyled">
				{#each componentNames as name, i (i)}
					<li>
						<a
							href={`${link}/${name}`}
							class="ravioli:xs size:xs l:flex emoji:link surface:1:primary align:center"
						>
							<svelte:element
								this={`h${String(elementTitleDepth)}`}
								class="link font:sm"
							>
								{name}
							</svelte:element>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class={collectionContainer}>
			{#each componentNames as name, i (i)}
				{@const SpecifiedElement = items[name]}
				<article
					id={`article-${title}-${name}`}
					class={`variant:bare w:auto ui:${name.toLowerCase()}`}
				>
					<svelte:element
						this={`h${String(elementTitleDepth)}`}
						class="link font:sm"
					>
						<a
							href={`${link}/${name}`}
							class="title ravioli:xs size:xs l:flex emoji:link surface:1:primary align:center"
						>
							{name}
						</a>
					</svelte:element>
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
		</div>
	{/if}
{/snippet}

{#if isPage}
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
				<EscapeHtml
					id="doc"
					html={content.html || ''}
					size="md"
					font="md"
					element="section"
				/>

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
								shape="mellow"
							>
								<h2 class="text:center">
									{category === 'raw' ? 'templates' : 'playbook'}
								</h2>
							</Magic>
						</div>
					</div>
					{@render categoryElements()}
				</section>
			</div>
		{/snippet}

		{#snippet aside()}
			<PropsDoc meta={content.meta as Meta} />
			<PropsDemo {path} meta={content.meta as Meta} categories={[category]} />
		{/snippet}
	</PageRails>
{:else}
	<section>
		<svelte:element this={`h${String(titleDepth)}`}>
			{category}
		</svelte:element>
		{#if children}
			{@render children()}
		{/if}

		<details class={`l:stack:${size} maki:block`}>
			<summary
				class={`color:${color} variant:outline ravioli:2xs emoji:${category}`}
			>
				{category}
			</summary>

			{@render categoryElements()}
		</details>
	</section>
{/if}
