<script lang="ts">
	import {setContext} from 'svelte'
	import {page} from '$app/stores'
	import {
		tokens,
		blocks,
		layouts,
		recipes,
		content,
		constants,
	} from '@fat-fuzzy/ui-s5'
	import {api} from '@fat-fuzzy/playbook'

	const {LayoutSidebar} = content
	const {PlaybookStore} = api

	let {children} = $props()
	let playbookStore = new PlaybookStore()

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}

	const tokenNames = Object.keys(tokens).sort(sortAsc)
	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
	const recipeNames = Object.keys(recipes).sort(sortAsc)
	let title = 'Fat Fuzzy UI' // TODO : Fix title in children components: add breadcrumb nav component ?

	let stylesApi = api.stylesApi.initStyles()
	setContext('stylesApi', stylesApi)
	setContext('playbookStore', playbookStore)

	const {styles, context, ui} = $page.data
	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE} = constants

	stylesApi.applyStyles(styles)
	playbookStore.styles = stylesApi.getStyleTree()
	playbookStore.reveal = context
	playbookStore.navReveal = ui?.navReveal || DEFAULT_NAV_REVEAL_STATE
	playbookStore.settingsReveal = ui?.settingsReveal || DEFAULT_REVEAL_STATE
	playbookStore.sidebarReveal = ui?.sidebarReveal || DEFAULT_NAV_REVEAL_STATE

	let items = [
		{
			slug: 'ui',
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
				// {
				// 	slug: 'graphics',
				// 	title: 'Graphics',
				// 	items: graphicsNames.map((c) => ({slug: c, title: c})),
				// },
			],
		},
	]

	let nav ={
		path: '',
		title: 'Design Library',
		id: 'nav-page',
		items,
		reveal: 'show',
		settings: playbookStore.app,
		breakpoint: 'sm',
		size: 'sm',
		color: 'primary',
		position: 'fixed',
		place: 'left',
		background: 'polar',
		formaction: 'toggleSidebar',
	}
</script>

<LayoutSidebar {nav} redirect={$page.url.pathname} path=''>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
