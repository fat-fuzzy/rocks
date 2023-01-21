<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {RevealNav} = blocks

	$: components = $page.data.components
	$: path = ''
	$: items = [
		{
			slug: 'ui',
			title: 'UI Library',
			items: [
				{
					slug: 'blocks',
					title: 'Blocks',
					items: components.blocks.map((c) => ({slug: c, title: c})),
				},
				{
					slug: 'layouts',
					title: 'Layouts',
					items: components.layouts.map((c) => ({slug: c, title: c})),
				},
			],
		},
	]
</script>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<RevealNav title="Fat Fuzzy UI" id="nav-page" {items} {path} breakpoint="bp:md" size="md" />
	</svelte:fragment>
	<div slot="main" class="l-stack card">
		<slot />
	</div>
</Sidebar>
