<script lang="ts">
	import lib from '@fat-fuzzy/lib'
	import {page} from '$app/stores'
	import Sketch from '$lib/ui/graphics/Sketch.svelte'

	$: title = $page.data.title
	$: dimensions = $page.data.dimensions
	$: id = $page.data.id
	$: sketch = lib.gfx.sketches[id]
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
	<h2>&nbsp;❤︎ {title}</h2>
</header>
<Sketch {sketch} {title} {dimensions} />
