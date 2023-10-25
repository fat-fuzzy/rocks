<script lang="ts">
	import {blocks, compositions, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = compositions

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}
	function sortDesc(a, b) {
		return a > b ? -1 : b > a ? 1 : 0
	}

	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
	const compositionNames = Object.keys(compositions).sort(sortAsc)
	let title = 'Fat Fuzzy UI' // TODO : Fix title in children components: add breadcrumb nav component ?

	$: path = ''
	$: items = [
		{
			slug: 'ui',
			title,
			items: [
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
</script>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav
			title="Design Library"
			id="nav-page"
			{items}
			{path}
			breakpoint="md"
			size="md"
			color="primary"
		/>
	</svelte:fragment>
	<div slot="main" class="l:center l:stack:xxl">
		<slot />
	</div>
</Sidebar>
