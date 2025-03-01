<script lang="ts">
	import {page} from '$app/state'

	import gfx from '@fat-fuzzy/gfx'
	import ui from '@fat-fuzzy/ui'
	import Sketch from '$lib/components/sketch/Sketch.svelte'

	const {PageMain} = ui.content

	let scene = $derived(
		gfx.gl.sketches.learning.find((s) => s.meta.slug === page.params.slug),
	)
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
		<h1>Play</h1>
		<h2>&nbsp;❤︎ {title}</h2>
	</div>
{/snippet}

<PageMain {title} {description} pageName="Play" {header}>
	{#key scene}
		{#if scene}
			<Sketch {scene} meta={scene.meta} size="sm" dev={true} />
		{/if}
	{/key}
</PageMain>
