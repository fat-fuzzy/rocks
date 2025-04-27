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

	const zones: {[key: string]: string} = {
		metro: 'm-zone',
		railway: 'r-zone',
		steam: 's-zone',
		tgv: 'g-zone',
		tram: 't-zone',
		voyager: 'v-zone',
	}

	let zoneId = $derived(zones[sidenav.layout] ?? 'zone')
</script>

<div class={`rails l:grid:${sidenav.layout} ${themeClass}`}>
	{#each areas as { zone, grid, gare, scroll, tag }, i}
		{@const gareClass = gare ? `gare:${gare}` : ''}
		{@const gridClass = grid ? `l:grid` : ''}
		{@const scrollClass = scroll ? `scroll:${scroll}` : ''}
		{@const element = tag ? tag : 'div'}

		<svelte:element
			this={element}
			class={`${zoneId}:${i + 1} ${gridClass} ${gareClass} ${scrollClass}`}
		>
			{@render zone()}
		</svelte:element>
	{/each}
</div>
