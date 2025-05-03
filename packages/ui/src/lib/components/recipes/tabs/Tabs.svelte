<script lang="ts">
	import type {TabsProps, Tab} from '$types'
	import styleHelper from '$lib/utils/styles.js'
	import {onMount} from 'svelte'

	let {
		path,
		id,
		tabs,
		layout = 'stack',
		background,
		container,
	}: TabsProps = $props()

	let currentHash = $state(path.split('#')[1])
	let indexedTabs = $state(
		tabs.map((tab: Tab, index: number) => ({...tab, index})),
	)

	let selectedTab = $derived(
		indexedTabs.find((tab: Tab) => tab.slug === currentHash) ?? indexedTabs[0],
	)

	let layoutClasses = styleHelper.getLayoutStyles({
		layout,
		background,
		container,
	})

	let presentationClasses = styleHelper.getStyles({
		layout: 'switcher:xs',
		align: 'center',
		justify: 'between',
	})

	function updateActiveTab(slug: string) {
		currentHash = slug
	}

	onMount(() => {
		let tabFound = indexedTabs.find((tab: Tab) => currentHash === tab.slug)
		if (tabFound) {
			currentHash = tabFound.slug
		}
	})
</script>

<ff-tabs class={layoutClasses}>
	<header class="l:sidebar size:lg">
		<nav {id} class="l:main:50">
			<ul role="tablist" class="unstyled l:switcher:xs">
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
						role="presentation"
						aria-current={selectedTab.slug === slug ? 'page' : undefined}
						class={`surface:0:${color}`}
					>
						<a
							id={`tab-${slug}`}
							href={`#${slug}`}
							role="tab"
							aria-selected={selectedTab.slug === slug}
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
		</nav>
	</header>
	<section class="tab-content">
		{#each tabs as { slug, content, labelledBy }}
			<!-- The article tag receives focus when the corresponding tab is active -->
			<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
			<article
				id={slug}
				aria-labelledby={labelledBy ? labelledBy : `tab-${slug}`}
				role="tabpanel"
				tabindex={selectedTab.slug === slug ? 0 : undefined}
			>
				{@render content()}
			</article>
		{/each}
	</section>
</ff-tabs>
