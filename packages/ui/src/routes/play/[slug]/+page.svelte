<script lang="ts">
	import lib from '@fat-fuzzy/lib'
	import type {PageData} from './$types'
	import Sketch from '$lib/blocks/graphics/Sketch.svelte'
	const {gfx} = lib

	export let data: PageData
	let sketch
	const {sketchData} = data
	const {title, dimensions, id} = sketchData
	sketch = gfx.sketches[id]
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
<Sketch {sketch} {title} {dimensions} />
