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
		children: Snippet
	}
	let {children, app, path = ''}: Props = $props()

	let formId = 'nav-ui'
	let reveal = $derived(
		$page.form?.formId === formId
			? $page.form.state
			: $page.data.sidebar.reveal,
	)
	let tokensReveal = $derived(
		$page.form?.formId === formId
			? $page.form.stateTokens
			: $page.data.sidebar.reveal,
	)

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
					formaction: 'toggleTokens',
					items: tokenNames.map((c) => ({
						slug: c,
						title: c,
					})),
				},
				{
					slug: 'blocks',
					title: 'Blocks',
					asset: 'blocks',
					formaction: 'toggleBlocks',
					items: blockNames.map((c) => ({
						slug: c,
						title: c,
					})),
				},
				{
					slug: 'layouts',
					title: 'Layouts',
					asset: 'layouts',
					formaction: 'toggleLayouts',
					items: layoutNames.map((c) => ({
						slug: c,
						title: c,
					})),
				},
				{
					slug: 'recipes',
					title: 'Recipes',
					asset: 'recipes',
					formaction: 'toggleRecipes',
					items: recipeNames.map((c) => ({
						slug: c,
						title: c,
					})),
				},
			],
		},
	]

	let nav = $derived({
		path,
		title: 'Content',
		id: formId,
		items,
		reveal,
		settings: {...playbookStore.app.settings},
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		formaction: 'toggleSidebar',
	})

	onMount(() => {
		if (styles) {
			playbookContext.applyStyles(styles)
		}
		playbookStore.styles = playbookContext.getStyleTree()
	})
</script>

<LayoutSidebar {nav} {app}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
