<script lang="ts">
	import type {LayoutData} from './$types'
	import type {StylesApi} from '$lib/api/styles'
	import {onDestroy, setContext} from 'svelte'
	import {page} from '$app/stores'

	import {initStyles} from '$lib/api/styles'
	import * as settingsStore from '$stores/settings'
	import * as stores from '$stores/ui'

	import {tokens, blocks, layouts, recipes, graphics, constants} from '$lib'

	export let data: LayoutData

	const {RevealNav} = recipes
	let path = $page.url.pathname

	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE, DEFAULT_TABS} = constants

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}

	const {sidebar, styles, context, state, currentTabs} = data

	const tokenNames = Object.keys(tokens).sort(sortAsc)
	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
	const recipeNames = Object.keys(recipes).sort(sortAsc)
	const graphicsNames = Object.keys(graphics).sort(sortAsc)
	let title = 'Fat Fuzzy Test' // TODO : Fix title in children components: add breadcrumb nav component ?

	let sidebarReveal = sidebar || DEFAULT_NAV_REVEAL_STATE
	let stylesApi: StylesApi = initStyles()
	setContext('stylesApi', stylesApi)

	stores.currentTab.set(currentTabs?.element || DEFAULT_TABS[0])
	stores.styles.set(styles)
	stores.reveal.set(context)
	stores.navReveal.set(state?.navReveal || DEFAULT_REVEAL_STATE)
	stores.settingsReveal.set(state?.settingsReveal || DEFAULT_REVEAL_STATE)
	stores.sidebarReveal.set(state?.sidebarReveal || DEFAULT_NAV_REVEAL_STATE)

	const localStores = [
		settingsStore.sidebarReveal.subscribe((value) => {
			if (value) {
				sidebarReveal = value
			}
		}),
	]

	$: path = ''
	$: items = [
		{
			slug: 'test',
			title,
			items: [
				{
					slug: 'tokens',
					title: 'Tokens',
					items: tokenNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'blocks',
					title: 'Blocks',
					items: blockNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'layouts',
					title: 'Layouts',
					items: layoutNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'recipes',
					title: 'Recipes',
					items: recipeNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'graphics',
					title: 'Graphics',
					items: graphicsNames.map((c) => ({slug: c, title: c})),
				},
			],
		},
	]

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<div class="l:sidebar:xs align-content:start">
	<div class={`l:side ${sidebarReveal.reveal}`}>
		<RevealNav
			title="Design Library"
			name="reveal"
			id="nav-page"
			{items}
			{path}
			settings={settingsStore}
			breakpoint="sm"
			size="md"
			color="bg:primary:light"
			position="fixed"
			place="left"
			background="polar"
			container="card"
			formaction="toggleSidebar"
			actionPath="/"
			redirect={$page.url.pathname}
		/>
	</div>
	<div class="l:main l:center l:stack:xl">
		<slot />
	</div>
</div>
