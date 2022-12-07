<script lang="ts">
	import lib from '@fat-fuzzy/lib'
	import type {PageData} from '../[id]/$types'
	import Sketch from '$lib/blocks/graphics/Sketch.svelte'

	export let data: PageData
	const {sketches} = data
	import {page} from '$app/stores'

	const {gfx} = lib
	let sketch
	const sketchFound = sketches.find((s) => {
		return s.slug === $page.params.slug
	})
	if (sketchFound) {
		sketch = gfx.sketches[sketchFound.id]
	}
</script>

<svelte:head>
	<title>UI Sandbox | 👾 Play</title>
	<meta
		name="description"
		content="Playground: a sandbox environment to experiment and learn web-based computer graphics."
	/>
</svelte:head>

<header class="header-page">
	<h1>👾 Play</h1>
</header>
<Sketch {sketch} />
