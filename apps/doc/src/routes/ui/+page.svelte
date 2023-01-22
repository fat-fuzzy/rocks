<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, stories} from '@fat-fuzzy/ui'
	const {Story} = stories

	let title = 'Fat Fuzzy UI'
	const components = blocks

	let initial = $page.data.components.initial

	$: keys = Object.keys(components)
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
	{#each keys as key}
		{@const Component = components[key]}
		<Story title={key} slug={key.toLowerCase()} component={Component} {initial} />
	{/each}
</section>
