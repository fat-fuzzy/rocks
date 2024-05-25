<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {
		headless,
		tokens,
		blocks,
		layouts,
		recipes,
		constants,
	} from '@fat-fuzzy/ui-s5'
	import {api, stores} from '@fat-fuzzy/playbook'

	const {Head} = headless
	const {Collection, Api} = api
	const {ToggleMenu} = recipes
	const actionPath = '/ui'
	const {DEFAULT_TABS, TABS} = constants

	let currentTabs = stores.ui.currentTabs
	let currentTab = $currentTabs.ui || DEFAULT_TABS[0]

	const tabs = TABS

	const localStores = [
		stores.ui.currentTabs.subscribe((value) => {
			if (value) {
				currentTab = value.ui
			}
		}),
	]

	function getComponentType(cat: string) {
		switch (cat) {
			case 'tokens':
				return tokens
			case 'blocks':
				return blocks
			case 'layouts':
				return layouts
			case 'recipes':
				return recipes
			default:
				return {}
		}
	}

	function handleTabChange(event: CustomEvent) {
		stores.ui.currentTabs.set({ui: event.detail.selected[0]})
	}

	$: category = $page.params.category
	$: markdowns = $page.data.markdowns
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = getComponentType(category)
	$: path = $page.url.pathname
	$: content = markdowns[category].find(({meta}) => meta.slug === category)
	$: headerClass = `l:grid:header:${currentTab.value} bp:xs bg:polar`

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Head {title} page="UI" description={`${title} Doc`} />

<header class={headerClass}>
	<h1 class="main">{title}</h1>
	{#if currentTab.value === 'demo'}
		<div class="context">
			<Api
				categories={['app']}
				{path}
				{actionPath}
				redirect={$page.url.pathname}
			/>
		</div>
	{/if}

	<form
		method="POST"
		class="tabs"
		action={`/ui?/updateTab&redirectTo=${$page.url.pathname}`}
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({update}) => {
				update({reset: false})
			}
		}}
	>
		<ToggleMenu
			id={`submit.${path}`}
			items={tabs.map((tab) => {
				if (tab.value == currentTab.value) {
					tab.initial = 'pressed'
				}
				return tab
			})}
			size="md"
			container="card:md"
			color="primary"
			shape="round"
			variant="outline"
			formaction={`/ui?/updateTab&redirectTo=${$page.url.pathname}`}
			on:click={handleTabChange}
		/>
	</form>
</header>

{#if content.html && currentTab.value === 'doc'}
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html content.html}</div>
		</section>
		<aside class="l:side">
			<aside class="l:side">
				{#if !content.meta}
					<p class="feedback bare emoji:default">Coming Soon!</p>
				{:else if content.meta.props_style}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}
							>Style Props</summary
						>
						<ul class="tags l:switcher:md">
							{#each content.meta.props_style as prop}
								<li class="card:sm bg:primary:lightest">{prop}</li>
							{/each}
						</ul>
					</details>
				{/if}
			</aside>
		</aside>
	</article>
{:else if currentTab.value === 'demo'}
	<Collection
		depth={1}
		isPage={true}
		{components}
		{path}
		{category}
		content={markdowns.categories.find(({meta}) => meta.slug === category)}
		{markdowns}
		{actionPath}
		redirect={$page.url.pathname}
	/>
{/if}
