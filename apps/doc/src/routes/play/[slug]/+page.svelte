<script lang="ts">
	import {page} from '$app/stores'
	import {dev} from '$app/environment'

	import lib from '@fat-fuzzy/lib'
	import {content} from '@fat-fuzzy/ui'
	import {graphics} from '@fat-fuzzy/sketch'

	const {Sketch} = graphics
	const {PageMain} = content

	let scene = $derived(
		lib.gfx.sketches.find((s) => s.meta.slug === $page.data.slug),
	)
	let title = $derived(scene?.meta.title || '')
	let description = `Sketch is a sandbox environment to experiment and learn web-based computer graphics`
</script>

<PageMain {title} {description} size="xl">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">Play</h1>
		<h2>&nbsp;❤︎ {title}</h2>
	{/snippet}
	{#key scene}
		{#if scene}
			<Sketch id={`sketch-${scene.meta.id}`} {scene} size="sm" {dev}/>
		{/if}
	{/key}
</PageMain>

