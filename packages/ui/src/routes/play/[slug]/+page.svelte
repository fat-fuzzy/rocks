<script lang="ts">
	import lib from '@fat-fuzzy/lib'
	import {page} from '$app/stores'
	import Sketch from '$lib/blocks/graphics/Sketch.svelte'

	const {gfx} = lib

	$: title = $page.data.title
	$: dimensions = $page.data.dimensions
	$: id = $page.data.id
	$: sketch = gfx.sketches[id]
</script>

<svelte:head>
	<title>UI Sandbox | 👾 Play</title>
	<meta
		name="description"
		content="Playground: a sandbox environment to experiment and learn web-based computer graphics."
	/>
</svelte:head>

<Sketch {sketch} {title} {dimensions} />
