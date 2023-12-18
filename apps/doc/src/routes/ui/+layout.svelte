<script lang="ts">
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'
	import {tokens, blocks, compositions, layouts, stores, constants} from '@fat-fuzzy/ui'
	const {RevealNav} = compositions
	let path = $page.url.pathname

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}

	const tokenNames = Object.keys(tokens).sort(sortAsc)
	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
	const compositionNames = Object.keys(compositions).sort(sortAsc)
	let title = 'Fat Fuzzy UI' // TODO : Fix title in children components: add breadcrumb nav component ?

	let sidebarReveal: {[key: string]: string} = {reveal: ''}

	const {styles, context, state, currentTabs} = $page.data
	const {DEFAULT_REVEAL_STATE, DEFAULT_NAV_REVEAL_STATE, TABS} = constants

	stores.ui.elementTab.set(currentTabs?.element || TABS[0])
	stores.ui.styles.set(styles)
	stores.ui.reveal.set(context)
	stores.ui.navReveal.set(state?.navReveal || DEFAULT_NAV_REVEAL_STATE)
	stores.ui.settingsReveal.set(state?.settingsReveal || DEFAULT_REVEAL_STATE)
	stores.ui.sidebarReveal.set(state?.sidebarReveal || DEFAULT_NAV_REVEAL_STATE)

	const localStores = [
		stores.settings.sidebarReveal.subscribe((value) => {
			if (value) {
				sidebarReveal = value
			}
		}),
	]

	$: path = ''
	$: items = [
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
					slug: 'compositions',
					title: 'Compositions',
					items: compositionNames.map((c) => ({slug: c, title: c})),
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
			settings={stores.settings}
			breakpoint="sm"
			size="md"
			color="bg:primary:light"
			position="fixed"
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
