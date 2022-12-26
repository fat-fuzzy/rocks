<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts} from '@fat-fuzzy/ui'
	const {Sidebar} = layouts
	const {SubNav} = blocks

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

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI Library stories" />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<SubNav title="Fat Fuzzy UI" id="nav-page" {items} {path} breakpoint="bp:md" />
	</svelte:fragment>
	<div slot="main" class="l-stack l-text">
		<slot />
	</div>
</Sidebar>
