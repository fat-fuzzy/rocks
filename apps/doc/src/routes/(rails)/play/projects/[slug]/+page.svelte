<script lang="ts">
	import {page} from '$app/stores'
	import {dev} from '$app/environment'

	import gfx from '@fat-fuzzy/gfx'
	import sketch from '@fat-fuzzy/sketch'

	const {Sketch} = sketch.graphics
	let slug = $derived($page.params.slug)
	let scene = $derived(
		gfx.gl.sketches.projects.find((s) => s.meta.slug === slug),
	)
</script>

{#key scene}
	{#if scene}
		<Sketch {scene} meta={scene.meta} size="sm" {dev} />
	{/if}
{/key}
