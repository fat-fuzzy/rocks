<script lang="ts">
	import { page } from '$app/stores';
	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Nav } = blocks;

	$: components = $page.data.components;
	$: path = '';
	$: items = [
		{
			slug: 'ui',
			title: 'Library',
			items: [
				{
					slug: 'blocks',
					title: 'Blocks',
					items: components.blocks.map((c) => ({ slug: c, title: c }))
				},
				{
					slug: 'layouts',
					title: 'Layouts',
					items: components.layouts.map((c) => ({ slug: c, title: c }))
				}
			]
		}
	];
	// TODO: fix links
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI Library stories" />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<Nav {items} {path} />
	</svelte:fragment>
	<div slot="main" class="l-stack l-text">
		<slot />
	</div>
</Sidebar>
