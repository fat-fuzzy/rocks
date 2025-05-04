<script lang="ts">
	import type {LayoutGridProps} from '$types'
	import format from '$lib/utils/format.js'

	let {areas, size, sidenav, app, path}: LayoutGridProps = $props()

	let brightness = $derived(app.brightness)
	let contrast = $derived(app.contrast)
	let pageClass = $derived(format.getClassNameFromPathname(path))
	let themeClass = $derived(
		`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`,
	)

	let sizeClass = $derived(size ? `size:${size}` : '')
</script>

<div class={`rails l:grid:${sidenav.layout} ${themeClass} ${sizeClass}`}>
	{#each areas as { zone, grid, gare, scroll, tag }, i}
		{@const gridClass = grid ? `l:grid ${sizeClass}` : ''}
		{@const gareClass = gare ? gare : ''}
		{@const scrollClass = scroll ? `scroll:${scroll}` : ''}
		{@const element = tag ? tag : 'div'}

		<svelte:element
			this={element}
			class={`zone:${i + 1} ${sidenav.layout} ${gridClass} ${scrollClass} ${gareClass}`}
		>
			{@render zone()}
		</svelte:element>
	{/each}
</div>
