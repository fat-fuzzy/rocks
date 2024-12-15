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

	let selectedTab = $state()
	let layoutClasses = styleHelper.getLayoutStyles({
		layout,
		background,
		container,
	})

	onMount(() => {
		let currentHash = path.split('#')[1]
		let tabFound = tabs.find((tab: Tab) => currentHash === tab.slug)
		selectedTab = tabFound
			? tabFound.slug
			: (tabs.find((tab: Tab) => tab.initial) ?? tabs[0]).slug
	})
</script>

<ff-tabs class={layoutClasses}>
	<nav {id} class="tabs">
		<ul role="tablist" class="unstyled l:switcher:xs">
			{#each tabs as { id, title, slug, color, size, variant, shape, asset }}
				{@const link = id ? `${slug}-${id}` : slug}
				{@const presentationClasses = styleHelper.getStyles({
					layout: 'switcher:xs',
					align: 'center',
					justify: 'between',
				})}
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
					aria-current={selectedTab === slug ? 'page' : undefined}
					class={`surface:0:${color}`}
				>
					<a
						id={`tab-${link}`}
						href={`#${link}`}
						tabindex={selectedTab === slug ? undefined : -1}
						role="tab"
						aria-selected={selectedTab === slug}
						aria-controls={link}
						onclick={() => (selectedTab = slug)}
						class={`${presentationClasses} ${linkClasses}`}
					>
						<ff-icon class={iconClasses}></ff-icon>
						{title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<section class="tab-content">
		{#each tabs as { id, slug, content }}
			{@const link = id ? `${slug}-${id}` : slug}
			<!-- The article tag receives focus via JS when the corresponding tab is active -->
			<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
			<article
				aria-labelledby={`tab-${link}`}
				role="tabpanel"
				hidden={selectedTab !== slug}
				tabindex={selectedTab === slug ? undefined : -1}
			>
				{@render content()}
			</article>
		{/each}
	</section>
</ff-tabs>
