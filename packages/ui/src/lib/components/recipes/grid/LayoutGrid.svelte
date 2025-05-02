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

	const zones: {[key: string]: string} = {
		metro: 'm-zone',
		railway: 'r-zone',
		steam: 's-zone',
		tgv: 'g-zone',
		tram: 't-zone',
		voyager: 'v-zone',
	}

	let zoneId = $derived(zones[sidenav.layout] ?? 'zone')
	let sizeClass = $derived(size ? `size:${size}` : '')
</script>

<div class={`rails l:grid:${sidenav.layout} ${themeClass} ${sizeClass}`}>
	{#each areas as { zone, grid, gare, scroll, tag }, i}
		{@const localZoneId =
			(i === 1 || i === 2) && sidenav.layout !== 'tgv' ? 'zone' : zoneId}
		{@const gridClass = grid ? `l:grid ${sizeClass}` : ''}
		{@const scrollClass = scroll ? `scroll:${scroll}` : ''}
		{@const element = tag ? tag : 'div'}

		<svelte:element
			this={element}
			class={`${localZoneId}:${i + 1} ${gridClass} ${scrollClass}`}
		>
			{@render zone()}
		</svelte:element>
	{/each}
</div>
