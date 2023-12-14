<script lang="ts">
	import type {LayoutData} from './$types'
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import * as settingsStore from '$stores/settings'
	import * as uiStore from '$stores/ui'

	import {tokens, blocks, compositions, layouts} from '$lib'

	export let data: LayoutData

	const {RevealNav} = compositions
	let path = $page.url.pathname

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}

	const {sidebar, styles, context} = data

	settingsStore.sidebarReveal.set(sidebar)
	uiStore.styles.set(styles)
	uiStore.reveal.set(context)

	const tokenNames = Object.keys(tokens).sort(sortAsc)
	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
	const compositionNames = Object.keys(compositions).sort(sortAsc)
	let title = 'Fat Fuzzy Test' // TODO : Fix title in children components: add breadcrumb nav component ?

	let sidebarReveal: {[key: string]: string} = sidebar || {reveal: ''}

	const stores = [
		settingsStore.sidebarReveal.subscribe((value) => {
			if (value) {
				sidebarReveal = value
			}
		}),
	]

	$: path = ''
	$: items = [
		{
			slug: 'doc',
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
		stores.forEach((unsubscribe) => unsubscribe())
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
