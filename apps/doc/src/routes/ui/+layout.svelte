<script lang="ts">
	import {page} from '$app/stores'
	import {tokens, blocks, compositions, layouts} from '@fat-fuzzy/ui'
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

	let expanded = true

	function toggleReveal(event) {
		expanded = event.detail.expanded
	}

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
	$: sidebarReveal = expanded ? '' : 'minimize'
</script>

<div class="l:sidebar:xs">
	<div class={`l:side ${sidebarReveal}`}>
		<RevealNav
			title="Design Library"
			id="nav-page"
			{items}
			page={path}
			breakpoint="sm"
			size="md"
			color="bg:primary:light"
			position="fixed"
			background="polar"
			on:toggleReveal={toggleReveal}
		/>
	</div>
	<div class="l:main l:center l:stack:xxl">
		<slot />
	</div>
</div>
