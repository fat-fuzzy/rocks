<script lang="ts">
	import {page} from '$app/state'
	import {dev} from '$app/environment'

	import gfx from '@fat-fuzzy/gfx'
	import ui from '@fat-fuzzy/ui'
	import sketch from '@fat-fuzzy/sketch'

	const {Sketch} = sketch.graphics
	const {PageMain} = ui.content

	let scene = $derived(
		gfx.gl.sketches.projects.find((s) => s.meta.slug === page.data.meta.slug),
	)
	let title = $derived(scene?.meta.title || '')
	let description = `Sketch is a sandbox environment to experiment and learn web-based computer graphics`
</script>

<PageMain {title} {description} pageName="Play" size="xl">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">Sketch</h1>
		<h2>{title}</h2>
	{/snippet}
	{#key scene}
		{#if scene}
			<Sketch {scene} size="sm" {dev} />
		{/if}
	{/key}
</PageMain>
