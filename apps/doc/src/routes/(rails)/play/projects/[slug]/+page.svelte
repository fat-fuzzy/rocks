<script lang="ts">
	import {page} from '$app/state'
	import {dev} from '$app/environment'

	import ui from '@fat-fuzzy/ui'
	import gfx from '@fat-fuzzy/gfx'
	import sketch from '@fat-fuzzy/sketch'

	const {Sketch} = sketch.graphics
	const {EscapeHtml} = ui.headless

	let html = $derived(page.data.html)
	let slug = $derived(page.params.slug)
	let scene = $derived(
		gfx.gl.sketches.projects.find((s) => s.meta.slug === slug),
	)
</script>

{#key scene}
	{#if scene}
		<Sketch {scene} meta={scene.meta} size="sm" {dev}>
			<EscapeHtml id={slug} {html} size="md" />
		</Sketch>
	{/if}
{/key}
