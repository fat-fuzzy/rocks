<script lang="ts">
	import type {UiSize, PageRailsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
	import Reveal from '$lib/components/layouts/Reveal.svelte'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'main',
		title = 'PageRails',
		path = '',
		hash,
		description = `Basic page layout`,
		pageName,
		size,
		dimensions,
		justify,
		main,
		nav,
		aside,
		footer,
		context,
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)
	let currentHash = $state(hash ?? '')
	let mediaClass = $derived(dimensions ? `media:${dimensions}` : '')
	let presentationClasses = styleHelper.getStyles({
		size: '2xs',
		layout: 'flex',
		align: 'center',
	})

	let header = $derived({
		title,
		main: headerMain,
	})
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet pageNav()}
	<nav class="page-nav">
		<ul class="l:switcher:2xs th:2xs unstyled">
			{#each nav as { title, slug, color, size, variant, shape, asset }}
				{@const iconClasses = styleHelper.getStyles({
					color,
					size,
					variant,
					shape,
					asset,
					assetType: 'emoji',
				})}
				{@const linkClasses = styleHelper.getStyles({
					font: 'sm',
					size: '3xs',
					color,
					container: 'ravioli',
				})}
				<li aria-current={currentHash === slug ? 'page' : undefined}>
					<a
						id={`tab-${slug}`}
						href={`#${slug}`}
						class={`${presentationClasses} ${linkClasses} surface:1:${color} link`}
						onclick={() => {
							currentHash = slug
						}}
					>
						<ff-icon class={iconClasses}></ff-icon>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/snippet}

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} size="2xs" />
{/snippet}

<main {id} class="page-main">
	<PageHeader size={size as UiSize} layout="flex" {justify} {...header} />
	{@render main()}
	{#if footer}
		{@render footer()}
	{/if}
</main>

{#if nav.length > 0 || aside}
	<div id={`context-${id}`} class={`page-context ${mediaClass}`}>
		<Reveal
			id="context"
			element="aside"
			auto={true}
			reveal={context?.reveal || ''}
			title="On this Page"
			position={false}
			place="left"
			color="primary"
			justify="evenly"
			font="sm"
			size="sm"
			variant="outline"
			breakpoint="xs"
			formaction="toggleContext"
			dismiss="outside"
		>
			<div class="l:stack:2xs">
				{#if nav.length > 0}
					{@render pageNav()}
				{/if}
				{#if aside}
					{@render aside()}
				{/if}
			</div>
		</Reveal>
	</div>
{/if}
