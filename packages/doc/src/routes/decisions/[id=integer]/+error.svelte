<script lang="ts">
	import { page } from '$app/stores';
	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Menu } = blocks;

	$: decisions = $page.data.decisions;
</script>

<svelte:head>
	<title>FatFuzzy Doc | Decisions</title>
	<meta name="description" content="Fat Fuzzy Doc - Log of architectural decisions" />
</svelte:head>

<Sidebar>
	<div slot="side">
		{#each decisions as { meta, path }}
			<a data-sveltekit-prefetch href={path}>{meta.title}</a><br />
		{/each}
	</div>
	<div slot="main" class="l-stack">
		<h1>Error</h1>
		<p>{$page.status}: {$page.error?.message}</p>
	</div>
</Sidebar>
