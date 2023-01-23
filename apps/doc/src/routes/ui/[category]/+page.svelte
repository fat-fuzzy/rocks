<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts, api} from '@fat-fuzzy/ui'
	import type {ComponentType} from 'svelte'

	const {Block} = api

	let initial = $page.data.components.initial

	let title: string
	let components: {[key: string]: ComponentType}
	$: title = $page.data.title
	$: components = $page.data.slug === 'blocks' ? blocks : layouts // TODO: try dynamic import
	$: keys = Object.keys(components)
</script>

<header class="header-page">
	<h1>{title}</h1>
</header>

<section class="l-text:xl l-stack">
	{#each keys as key}
		{@const Component = components[key]}
		<Block title={key} slug={key.toLowerCase()} component={Component} {initial} />
	{/each}
</section>
