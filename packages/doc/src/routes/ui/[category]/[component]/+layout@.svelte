<script lang="ts">
	import { page } from '$app/stores';
	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Menu } = blocks;

	$: components = $page.data.components;
</script>

<svelte:head>
	<title>FatFuzzy Doc | Decisions</title>
	<meta name="description" content="Fat Fuzzy Doc - Log of architectural components" />
</svelte:head>

<Sidebar placement="start">
	<div slot="main" class="l-stack">
		<slot />
	</div>
	<div slot="side" class="sticky">
		<a data-sveltekit-prefetch href={`/ui`}><h1>Stories</h1></a><br />
		<a data-sveltekit-prefetch href={`/ui/blocks`}><h2>Blocks</h2></a><br />
		{#each components.blocks as block}
			<a data-sveltekit-prefetch href={`/ui/blocks/${block}`}>{block}</a><br />
		{/each}
		<a data-sveltekit-prefetch href={`/ui/layouts`}><h2>Layouts</h2></a><br />
		{#each components.layouts as layout}
			<a data-sveltekit-prefetch href={`/ui/layouts/${layout}`}>{layout}</a><br />
		{/each}
	</div>
</Sidebar>
