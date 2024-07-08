<script lang="ts">
	import {page} from '$app/stores'

	import lib from '@fat-fuzzy/lib'
	import {content} from '@fat-fuzzy/ui-s5'
	import {graphics} from '@fat-fuzzy/sketch'

	const {Sketch} = graphics
	const {PageMain} = content

	let scene = $derived(
		lib.gfx.sketches.find((s) => s.meta.slug === $page.data.slug),
	)
	let title = $derived(scene?.meta.title || '')
	let description = `Sketch is a sandbox environment to experiment and learn web-based computer graphics`
	let headerClass = 'l:flex align:center'
</script>

<PageMain {title} {description} size="xl">
	{#snippet header()}
		<h1>Play</h1>
		<h2>&nbsp;❤︎ {title}</h2>
	{/snippet}
	{#key scene}
		{#if scene}
			<Sketch id={`sketch-${scene.meta.id}`} {scene} size="sm" />
		{/if}
	{/key}
</PageMain>

