<script lang="ts">
	import {onMount, getContext, setContext, type Snippet} from 'svelte'
	import {page} from '$app/stores'
	import fatFuzzyUi from '@fat-fuzzy/ui'
	import playbookStore from '$lib/api/store.svelte'
	import * as api from '$lib/api/styles.api'

	const {LayoutSidebar} = fatFuzzyUi.content

	type Props = {
		app: {settings: {[key: string]: string}}
		path?: string
		redirect: string
		children: Snippet
	}	
	let {redirect, children, app, path=''}: Props= $props()

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}

	const tokenNames = Object.keys(fatFuzzyUi.tokens).sort(sortAsc)
	const blockNames = Object.keys(fatFuzzyUi.blocks).sort(sortAsc)
	const layoutNames = Object.keys(fatFuzzyUi.layouts).sort(sortAsc)
	const recipeNames = Object.keys(fatFuzzyUi.recipes).sort(sortAsc)
	let playbookContext: api.StylesApi = getContext('playbookContext')
	setContext('playbookStore', playbookStore)

	let {styles, context, ui} = $state($page.data)
	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE} = fatFuzzyUi.constants

	playbookStore.reveal = context
	playbookStore.navReveal = ui?.navReveal || DEFAULT_NAV_REVEAL_STATE
	playbookStore.settingsReveal = ui?.settingsReveal || DEFAULT_REVEAL_STATE
	playbookStore.sidebarReveal = ui?.sidebarReveal || DEFAULT_NAV_REVEAL_STATE

	let items = [
		{
			slug: 'ui', // root path of the Playbook
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
		settings: {...playbookStore.app.settings},
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
