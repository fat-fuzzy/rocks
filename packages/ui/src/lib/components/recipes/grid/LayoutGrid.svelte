<script lang="ts">
	import type {LayoutGridProps} from '$types'
	import format from '$lib/utils/format.js'

	let {areas, size, layout, app, path}: LayoutGridProps = $props()

	let brightness = $derived(app.brightness)
	let contrast = $derived(app.contrast)
	let pageClass = $derived(format.getClassNameFromPathname(path))
	let themeClass = $derived(
		`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`,
	)

	let containClass = $derived(
		layout === 'steam' || layout === 'tram' ? 'contain' : '',
	)
	let sizeClass = $derived(size ? `size:${size}` : '')
</script>

<div
	class={`rails l:grid:urbanist ${containClass} ${layout} ${themeClass} ${sizeClass}`}
>
	{#each areas as { zone, grid, gare, hug, exchange, scroll, tag }, i (i)}
		{@const gridClass = grid ? `l:grid ${sizeClass}` : ''}
		{@const gareClass = gare ? gare : ''}
		{@const exchangeClass = exchange ? 'exchange bg:inherit' : 'bg:inherit'}
		{@const hugClass = i === 1 ? 'hug' : ''}
		{@const scrollClass = scroll ? `scroll:${scroll}` : ''}
		{@const element = tag ? tag : 'div'}

		<svelte:element
			this={element}
			class={`zone:${i + 1} ${layout} ${exchangeClass} ${gridClass} ${hugClass} ${scrollClass} ${gareClass}`}
		>
			{@render zone()}
		</svelte:element>
	{/each}
</div>
