<script lang="ts">
	import { page } from '$app/stores';
	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Menu } = blocks;

	$: components = $page.data.components;
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy Doc - UI" />
</svelte:head>

<Sidebar size="xs">
	<svelte:fragment slot="side">
		<a data-sveltekit-prefetch href={`/ui`}><h1>Library</h1></a><br />
		<a data-sveltekit-prefetch href={`/ui/blocks`}><h2>Blocks</h2></a><br />
		{#each components.blocks as block}
			<a data-sveltekit-prefetch href={`/ui/blocks/${block}`}>{block}</a><br />
		{/each}
		<a data-sveltekit-prefetch href={`/ui/layouts`}><h2>Layouts</h2></a><br />
		{#each components.layouts as layout}
			<a data-sveltekit-prefetch href={`/ui/layouts/${layout}`}>{layout}</a><br />
		{/each}
	</svelte:fragment>
	<div slot="main" class="l-stack l-text">
		<slot />
	</div>
</Sidebar>
