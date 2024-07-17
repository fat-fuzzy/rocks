<script lang="ts">
	import {onMount, getContext, setContext, type Snippet} from 'svelte'
	import {page} from '$app/stores'
	import {
		tokens,
		blocks,
		layouts,
		recipes,
		content,
		constants,
	} from '@fat-fuzzy/ui-s5'
	import playbookStore from '$lib/api/store.svelte'
	import * as api from '$lib/api/styles.api'

	const {LayoutSidebar} = content

	type Props = {
		app?: {settings: {[key: string]: string}}
		redirect: string
		children: Snippet
	}	
	let {redirect, children, app}: Props= $props()

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}

	const tokenNames = Object.keys(tokens).sort(sortAsc)
	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
	const recipeNames = Object.keys(recipes).sort(sortAsc)
	let playbookContext: api.StylesApi = getContext('playbookContext')
	setContext('playbookStore', playbookStore)

	let {styles, context, ui} = $state($page.data)
	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE} = constants

	playbookStore.reveal = context
	playbookStore.navReveal = ui?.navReveal || DEFAULT_NAV_REVEAL_STATE
	playbookStore.settingsReveal = ui?.settingsReveal || DEFAULT_REVEAL_STATE
	playbookStore.sidebarReveal = ui?.sidebarReveal || DEFAULT_NAV_REVEAL_STATE

	let path = ''
	let items = [
		{
			slug: 'ui',
			title: 'Library',
			items: [
				{
					slug: 'tokens',
					title: 'Tokens',
					asset: 'tokens',
					items: tokenNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'blocks',
					title: 'Blocks',
					asset: 'blocks',
					items: blockNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'layouts',
					title: 'Layouts',
					asset: 'layouts',
					items: layoutNames.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'recipes',
					title: 'Recipes',
					asset: 'recipes',
					items: recipeNames.map((c) => ({slug: c, title: c})),
				},
			],
		},
	]

	let nav = {
		path,
		title: 'Content',
		id: 'nav-page',
		items,
		reveal: 'expanded',
		settings: {...playbookStore.app},
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		formaction: 'toggleSidebar',
	}

	onMount(() => {
		if(styles) {
			playbookContext.applyStyles(styles)
		}
		playbookStore.styles = playbookContext.getStyleTree()
	})
</script>

<LayoutSidebar {nav} {redirect} {path} {app}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
