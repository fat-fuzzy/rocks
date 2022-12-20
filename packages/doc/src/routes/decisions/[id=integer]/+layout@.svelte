<script lang="ts">
	import { page } from '$app/stores';
	const { decisions } = $page.data;
	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Menu } = blocks;
</script>

<svelte:head>
	<title>FatFuzzy Doc | Decisions</title>
	<meta name="description" content="Fat Fuzzy Doc - Log of architectural decisions" />
</svelte:head>

<Sidebar>
	<svelte:fragment slot="side">
		{#each decisions as { meta }}
			<a href={meta.id}>{meta.title}</a><br />
		{/each}
	</svelte:fragment>
	<svelte:fragment slot="main">
		<slot />
	</svelte:fragment>
</Sidebar>
