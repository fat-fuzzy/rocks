<script lang="ts">
	import {page} from '$app/state'
	import {dev} from '$app/environment'

	import gfx from '@fat-fuzzy/gfx'
	import ui from '@fat-fuzzy/ui'
	import sketch from '@fat-fuzzy/sketch'

	const {Sketch} = sketch.graphics
	const {PageMain} = ui.content
	const sketches = gfx.gl.sketches.projects

	let scene = $derived(sketches.find((s) => s.meta.slug === page.params.slug))
	let title = $derived(scene?.meta.title || '')
	let description = `Sketch is a sandbox environment to experiment and learn web-based computer graphics`

	let header = $derived({
		title,
		media: true,
		main: headerMain,
	})
</script>

{#snippet headerMain()}
	<div class="l:flex:md">
		<h1>Sketch</h1>
		<h2>{title}</h2>
	</div>
{/snippet}

<PageMain pageName="Play" {title} {description} {header}>
	{#if scene}
		<Sketch {scene} size="sm" {dev} />
	{/if}
</PageMain>
