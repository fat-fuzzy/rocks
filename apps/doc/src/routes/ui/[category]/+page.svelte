<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'

	$: category = $page.params.category
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = category === 'blocks' ? blocks : layouts
	$: Api = category === 'blocks' ? api.Block : api.Layout
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
	{#each componentNames as name}
		{@const Component = components[name]}
		<svelte:component this={Api} title={name} component={Component} />
	{/each}
</section>
