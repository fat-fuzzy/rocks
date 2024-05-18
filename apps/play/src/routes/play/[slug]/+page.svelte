<script lang="ts">
	import {page} from '$app/stores'

	import lib from '@fat-fuzzy/lib'
	import {headless} from '@fat-fuzzy/ui'
	import {Sketch} from '@fat-fuzzy/sketch'

	const {Head} = headless

	$: sketch = $page.data.sketches.find((s) => s.slug === $page.data.slug)
	$: title = $page.data.title
	$: dimensions = $page.data.dimensions
	$: id = $page.data.id
	$: scene = lib.gfx.sketches[id]
	$: meta = sketch?.meta ?? undefined
	$: headerClass = 'l:flex card:sm align:center bg:polar'
</script>

<Head
	{title}
	page="Play"
	description={`${title} - A sandbox environment to experiment and learn web-based computer graphics`}
/>

<div class="l:stack:xl md">
	<header class={headerClass}>
		<h1 class="card:md">Play</h1>
		<h2>&nbsp;❤︎ {title}</h2>
	</header>
	{#key $page.data.slug}
		<Sketch
			{scene}
			{title}
			{dimensions}
			{meta}
			asset={sketch.asset}
			size="sm"
		/>
	{/key}
</div>
