<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {tokens, blocks, layouts, recipes, graphics, api, stores, constants, headless} from '$lib'

	const {Head} = headless
	const {Collection, Api} = api
	const {RevealAuto} = layouts
	const {ToggleMenu} = recipes

	const actionPath = '/test'
	const {DEFAULT_REVEAL_STATE, DEFAULT_TABS, TABS} = constants

	let revealContext = $page.data.dsContext || DEFAULT_REVEAL_STATE
	let currentTab = $page.data.currentTabs?.category || DEFAULT_TABS[0]

	const tabs = TABS

	const localStores = [
		stores.ui.reveal.subscribe((value) => {
			if (value) {
				revealContext = value
			}
		}),
		stores.ui.currentTab.subscribe((value) => {
			if (value) {
				currentTab = value
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
			case 'graphics':
				return graphics
			default:
				return {}
		}
	}

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	function handleTabChange(event: CustomEvent) {
		stores.ui.currentTab.set(event.detail.selected[0])
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = getComponentType(category)
	$: path = $page.url.pathname
	$: markdowns = $page.data.markdowns
	$: content = markdowns[category].find(({meta}) => meta.slug === category)
	$: headerClass = 'page-header l:switcher:xs bp:xxs bg:polar'

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Head {title} page="Test" description={`${title} Test Page`} />

<header class={headerClass}>
	<h1 class="l:main:30 maki lg">{title}</h1>
	<RevealAuto
		id="ui-category-app-context"
		size="sm"
		breakpoint="sm"
		color="primary"
		align="start"
		variant="outline"
		title="Context"
		formaction="toggleContext"
		{actionPath}
		{reveal}
		redirect={$page.url.pathname}
		on:toggle={handleToggle}
	>
		<div slot="content" class="ui:menu l:switcher:sm">
			{#if currentTab.value === 'demo'}
				<Api {path} {actionPath} redirect={$page.url.pathname} />
			{/if}
			<form
				method="POST"
				class="l:switcher:sm shrink"
				action={`/test?/updateTab&redirectTo=${$page.url.pathname}`}
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
					layout="switcher"
					size="md"
					container="card:md"
					color="primary"
					variant="round outline"
					formaction={`/test?/updateTab&redirectTo=${$page.url.pathname}`}
					on:click={handleTabChange}
				/>
			</form>
		</div>
	</RevealAuto>
</header>

{#if content.html && currentTab.value === 'doc'}
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html content.html}</div>
		</section>
		<aside class="l:side">
			{#if !content.meta}
				<p class="feedback bare emoji:default">Coming Soon!</p>
			{:else if content.meta.props_style}
				<details open>
					<summary class={`card:xs bg:primary:light box:primary:light`}>Style Props</summary>
					<ul class="tags l:switcher:md">
						{#each content.meta.props_style as prop}
							<li class="card:sm bg:primary:lightest">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
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
