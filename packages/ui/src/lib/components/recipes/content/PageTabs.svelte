<script lang="ts">
	import type {PageTabsProps} from '$types'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import Breadcrumb from '$lib/components/recipes/navs/Breadcrumb.svelte'
	import styleHelper from '$lib/utils/styles.js'
	import {onMount} from 'svelte'

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
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass = $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(`${layoutClass} ${justifyClass} align:baseline`)

	let currentHash = $state(path.split('#')[1] ?? tabs[0].slug)

	let presentationClasses = styleHelper.getStyles({
		layout: 'switcher:xs',
		align: 'center',
		justify: 'between',
	})

	function updateActiveTab(slug: string) {
		currentHash = slug
	}
</script>

<Head pageName={currentPage} {title} {description} />

{#snippet breadcrumbTabs()}
	<ul role="tablist" class="l:switcher:xs">
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
				container: 'card',
			})}
			<li
				role="presentation"
				aria-current={currentHash === slug ? 'page' : undefined}
				class={`surface:0:${color}`}
			>
				<a
					id={`tab-${slug}`}
					href={`#${slug}`}
					role="tab"
					aria-selected={currentHash === slug}
					aria-controls={slug}
					onclick={() => updateActiveTab(slug)}
					class={`${presentationClasses} ${linkClasses}`}
				>
					<ff-icon class={iconClasses}></ff-icon>
					{title}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<main {id}>
	<header class={headerClass}>
		<Breadcrumb {id} {title} {path} level={1} {breadcrumbTabs} size="2xs" />
	</header>

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
