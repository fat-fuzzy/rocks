<script lang="ts">
	import {page} from '$app/stores'

	import lib from '@fat-fuzzy/lib'
	import {headless} from '@fat-fuzzy/ui'
	import {graphics} from '@fat-fuzzy/sketch'

	const {Head} = headless
	const {Sketch} = graphics

	$: scene = lib.gfx.sketches.find((s) => s.meta.slug === $page.data.slug)
	$: title = scene?.meta.title || ''
	$: headerClass = 'l:flex align:center'
</script>

<Head
	{title}
	page="Play"
	description={`${title} - A sandbox environment to experiment and learn web-based computer graphics`}
/>

<div class="card:md l:stack:md">
	<header class={headerClass}>
		<h1>Play</h1>
		<h2>&nbsp;❤︎ {title}</h2>
	</header>
	{#key $page.data.slug}
		{#if scene}
			<Sketch id={`sketch-${scene.meta.id}`} {scene} size="sm" />
		{/if}
	{/key}
</div>
