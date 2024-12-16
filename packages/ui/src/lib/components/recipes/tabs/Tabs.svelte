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
	let selectedTab = $state(
		indexedTabs.find((tab: Tab) => tab.initial) ?? tabs[0],
	)
	let tabHeader = $derived(selectedTab.header)
	let layoutClasses = styleHelper.getLayoutStyles({
		layout,
		background,
		container,
	})

	function updateActiveTab(slug: string) {
		selectedTab = indexedTabs.find((tab: Tab) => tab.slug === slug)
	}

	function onkeydown(e: KeyboardEvent) {
		let target = e.target as HTMLElement

		if (target?.id !== selectedTab.id) {
			return
		}
		e.preventDefault()

		let tab
		switch (e.key) {
			case 'Tab':
				// Get the next tab navigation
				let tabIndex = selectedTab.index
				if (e.shiftKey) {
					tabIndex--
				} else {
					tabIndex++
				}
				if (tabIndex < 0) {
					tabIndex = tabs.length - 1
				} else if (tabIndex >= tabs.length) {
					tabIndex = 0
				}
				selectedTab = indexedTabs[tabIndex]
				let link = selectedTab.id
					? `${selectedTab.slug}-${selectedTab.id}`
					: selectedTab.slug
				tab = document.getElementById(`tab-${link}`)
				break
			case 'Enter':
				// Get the current tab's main content
				tab = document.getElementById(`${id}-${selectedTab.slug}`)
				break
			default:
				return
		}
		// Focus on the tab nav or tab content
		tab?.focus()
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})
	}

	onMount(() => {
		let tabFound = indexedTabs.find((tab: Tab) => currentHash === tab.slug)
		if (tabFound) {
			selectedTab = tabFound
		}
	})
</script>

<ff-tabs class={layoutClasses}>
	<header class="l:sidebar:lg">
		<nav {id} class="l:main:50">
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
						aria-current={selectedTab.slug === slug ? 'page' : undefined}
						class={`surface:0:${color}`}
					>
						<a
							id={`tab-${link}`}
							href={`#${link}`}
							role="tab"
							aria-selected={selectedTab.slug === slug}
							aria-controls={link}
							onclick={() => updateActiveTab(slug)}
							class={`${presentationClasses} ${linkClasses}`}
							{onkeydown}
						>
							<ff-icon class={iconClasses}></ff-icon>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		{#if tabHeader}
			<div class="l:side">
				{@render tabHeader()}
			</div>
		{/if}
	</header>
	<section class="tab-content">
		{#each tabs as { id, slug, content }}
			{@const link = id ? `${slug}-${id}` : slug}
			<!-- The article tag receives focus via JS when the corresponding tab is active -->
			<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
			<article
				id={link}
				aria-labelledby={`tab-${link}`}
				role="tabpanel"
				tabindex={selectedTab.slug === slug ? 0 : -1}
			>
				{@render content()}
			</article>
		{/each}
	</section>
</ff-tabs>
