<script lang="ts">
	import {blocks, api} from '@fat-fuzzy/ui'
	const {Block} = api

	let title = 'Fat Fuzzy UI'
	const components = blocks

	$: componentNames = Object.keys(components)
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<section class="l-text:xl l-stack">
	<h2>Blocks</h2>
	{#each componentNames as name}
		{@const Component = components[name]}
		<Block title={name} component={Component} />
	{/each}
</section>
