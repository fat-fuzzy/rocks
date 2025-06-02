<script lang="ts">
	import {page} from '$app/state'
	import {dev} from '$app/environment'

	import gfx from '@fat-fuzzy/gfx'
	import Sketch from '$lib/components/sketch/Sketch.svelte'

	let scene = $derived(
		gfx.gl.sketches.learning.find((s) => s.meta.slug === page.params.slug),
	)
</script>

{#key scene}
	{#if scene}
		<Sketch {scene} meta={scene.meta} size="sm" {dev} />
	{/if}
{/key}
