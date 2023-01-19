<script lang="ts">
	import {page} from '$app/stores'
	import {blocks, layouts, stories} from '@fat-fuzzy/ui'
	import type {ComponentType} from 'svelte'

	const {Story} = stories

	// TODO : move to store : see also in other templates
	let initial = {
		theme: {light: 'day', contrast: 'contrast'},
		variant: '',
		size: 'md',
		color: 'primary',
		layout: 'switcher',
		// app: 'ui', // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
		icon: '✨',
	}

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
		<Story title={key} slug={key.toLowerCase()} component={Component} {initial} />
	{/each}
</section>
