<script lang="ts">
	import type {LayoutGridProps} from '$types'
	import format from '$lib/utils/format.js'

	let {areas, sidenav, app, path}: LayoutGridProps = $props()

	let brightness = $derived(app.brightness)
	let contrast = $derived(app.contrast)
	let pageClass = $derived(format.getClassNameFromPathname(path))
	let themeClass = $derived(
		`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`,
	)
</script>

<div class={`l:grid:${sidenav.layout} ${themeClass}`}>
	{#each areas as { zone, grid, gare }, i}
		{@const gareClass = gare ? `gare:${gare}` : ''}
		{@const gridClass = grid ? `l:grid:${grid}` : ''}

		<div class={`m-zone:${i + 1} ${gridClass} ${gareClass}`}>
			{@render zone()}
		</div>
	{/each}
</div>
