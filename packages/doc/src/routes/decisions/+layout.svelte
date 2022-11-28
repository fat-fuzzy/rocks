<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	const { decisions } = data;
	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Menu } = blocks;
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
		<slot />
	</div>
</Sidebar>
