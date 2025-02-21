<script lang="ts">
	import type {UiSize, PageTabsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import PageHeader from '$lib/components/recipes/content/PageHeader.svelte'
	import Breadcrumbs from '$lib/components/recipes/navs/Breadcrumbs.svelte'
	import styleHelper from '$lib/utils/styles.js'

	let {
		id = 'main',
		title = 'PageMain',
		path = '',
		description = `Basic page layout`,
		pageName,
		size,
		layout = 'sidebar',
		justify,
		tabs,
	}: PageTabsProps = $props()

	let currentPage = $derived(pageName ?? title)
	let currentHash = $state(path.split('#')[1] ?? tabs[0].slug)

	let presentationClasses = styleHelper.getStyles({
		layout: 'switcher:xs',
		align: 'center',
		justify: 'between',
	})

	let header = $derived({
		title,
		main: headerMain,
		side: headerSide,
	})
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet breadcrumbTabs()}
	<div class="ravioli:xs bg:inherit fixed:top-right bg:blur">
		<ul role="tablist" class="l:switcher:xs unstyled">
			{#each tabs as { title, slug, color, size, variant, shape, asset }}
				{@const iconClasses = styleHelper.getStyles({
					color,
					size,
					variant,
					shape,
					asset,
					assetType: 'emoji',
				})}
				{@const linkClasses = styleHelper.getStyles({
					size: '2xs',
					font: 'md',
					color,
					container: 'ravioli',
				})}
				<li
					aria-current={currentHash === slug ? 'page' : undefined}
					class={`surface:0:${color}`}
				>
					<a
						role="tab"
						id={`tab-${slug}`}
						href={`#${slug}`}
						aria-selected={currentHash === slug}
						aria-controls={slug}
						class={`${presentationClasses} ${linkClasses}`}
					>
						<ff-icon class={iconClasses}></ff-icon>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

{#snippet headerMain()}
	<Breadcrumbs {id} {title} {path} level={1} {breadcrumbTabs} size="2xs" />
{/snippet}
{#snippet headerSide()}
	{#if breadcrumbTabs}
		{@render breadcrumbTabs()}
	{/if}
{/snippet}
<main {id}>
	<PageHeader size={size as UiSize} {layout} {justify} {...header} />

	<section class="tab-content">
		{#each tabs as { slug, content }}
			<!-- The article tag receives focus when the corresponding tab is active -->
			<!-- aria-labelledby inside Breadcrumb -->

			<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
			<article
				id={slug}
				aria-labelledby={title}
				tabindex={currentHash === slug ? 0 : undefined}
				role="tabpanel"
			>
				{@render content()}
			</article>
		{/each}
	</section>
</main>
