<script lang="ts">
	import {blocks, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = blocks

	// TODO: move to utils / clean
	function sortAsc(a, b) {
		return a < b ? -1 : b < a ? 1 : 0
	}
	function sortDesc(a, b) {
		return a > b ? -1 : b > a ? 1 : 0
	}

	const blockNames = Object.keys(blocks).sort(sortAsc)
	const layoutNames = Object.keys(layouts).sort(sortAsc)
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
			],
		},
	]
</script>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav {title} id="nav-page" {items} {path} breakpoint="bp:md" size="md" />
	</svelte:fragment>
	<div slot="main" class="l:stack card">
		<slot />
	</div>
</Sidebar>
