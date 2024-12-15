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

	let selectedTab = $state(tabs.filter((tab: Tab) => tab.initial)[0]?.slug)
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
					size,
					threshold: '2xs',
					layout: 'switcher',
					align: 'center',
					justify: 'between',
					container: 'card',
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
					color,
				})}
				<li role="presentation">
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
				class={selectedTab === slug ? 'focused' : undefined}
			>
				{@render content()}
			</article>
		{/each}
	</section>
</ff-tabs>
