<script lang="ts">
	import type {UiSize, PageRailsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'main',
		title = 'PageRails',
		path = '',
		hash,
		description = `Basic page layout`,
		pageName,
		size,
		layout = 'sidebar',
		justify,
		main,
		side,
		nav,
	}: PageRailsProps = $props()

	let currentPage = $derived(pageName ?? title)
	let currentHash = $state(hash ?? nav[0].slug)

	let presentationClasses = styleHelper.getStyles({
		size: '2xs',
		layout: 'flex',
		align: 'center',
	})

	let header = $derived({
		title,
		main: headerMain,
		side: headerSide,
	})
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet pageNav()}
	<nav class="page-nav">
		<ul class="l:stack:2xs unstyled">
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
				<li
					class="raviolink"
					aria-current={currentHash === slug ? 'page' : undefined}
				>
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
{#snippet headerSide()}
	{#if pageNav}
		{@render pageNav()}
	{/if}
{/snippet}
<main {id}>
	<PageHeader size={size as UiSize} {layout} {justify} {...header} />

	<section class={`l:sidebar:${size}`}>
		<div class="l:main">
			{@render main()}
		</div>
		<aside class="l:side">
			{@render side()}
		</aside>
	</section>
</main>
