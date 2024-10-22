<script lang="ts">
	import {page} from '$app/stores'

	import gfx from '@fat-fuzzy/gfx'
	import ui from '@fat-fuzzy/ui'
	import Sketch from '$lib/components/sketch/Sketch.svelte'

	const {PageMain} = ui.content

	let scene = $derived(
		gfx.gl.sketches.learning.find((s) => s.meta.slug === $page.data.slug),
	)
	let title = $derived(scene?.meta.title || '')
	let description = $derived(`${title} - Play`)
</script>

<PageMain {title} {description} pageName="Play">
	{#snippet header()}
		<h1>Play</h1>
		<h2>&nbsp;❤︎ {title}</h2>
	{/snippet}
	{#key scene}
		{#if scene}
			<Sketch {scene} size="sm" dev={true} />
		{/if}
	{/key}
</PageMain>
