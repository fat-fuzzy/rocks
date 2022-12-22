<script lang="ts">
	import { blocks, stories } from '@fat-fuzzy/ui';
	const { Story } = stories;

	const components = blocks;
	const selected = { size: 'md' };

	$: keys = Object.keys(components);
</script>

<svelte:head>
	<title>FatFuzzy Doc | UI</title>
	<meta name="description" content="Fat Fuzzy UI Library documentation" />
</svelte:head>

<header class="header-page">
	<h1>Fat Fuzzy UI</h1>
</header>

{#each keys as key}
	{@const Component = components[key]}
	<Story title={key} slug={key.toLowerCase()} component={Component} {selected} />
{/each}
