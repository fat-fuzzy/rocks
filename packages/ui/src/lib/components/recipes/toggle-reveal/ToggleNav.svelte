<script lang="ts">
	import type {ToggleNavProps} from '$types'
	import styleHelper from '$lib/utils/styles.js'

	import ToggleReveal from '$lib/components/recipes/toggle-reveal/ToggleReveal.svelte'
	import SkipLinks from '$lib/components/recipes/navs/SkipLinks.svelte'
	import ToggleTree from '$lib/components/recipes/toggle-reveal/ToggleTree.svelte'

	let {
		id = 'toggle-nav',
		label = 'ToggleNav',
		path = '',
		asset,
		preload,
		layout,
		scroll,
		layer,
		color,
		size,
		shape,
		font,
		breakpoint,
		threshold,
		variant,
		align,
		justify,
		area,
		width,
		height,
		place = 'top',
		position,
		container,
		background,
		items = [],
		skipLinks,
	}: ToggleNavProps = $props()

	let layoutClasses = $derived(
		styleHelper.getStyles({
			position,
			size,
			justify,
			align,
			layout,
			breakpoint,
			threshold,
			background,
			container,
		}),
	)

	let widthClass = $derived(width ? `width:${width}` : '')
	let heightClass = $derived(area ? `height:${height}` : '')

	let revealClasses = $derived(
		area ? `${area}:${place} ${widthClass} ${heightClass}` : place,
	)

	let navClasses = $derived(`${layoutClasses} ${revealClasses}`)
</script>

<nav
	id={`nav-${id}`}
	class={navClasses}
	aria-label={label}
	data-testid={`nav-${id}`}
>
	{#if skipLinks}
		{@render skipLinks()}
	{:else}
		<SkipLinks id={`sidebar-${id}`} text="Skip to content" href="#main" />
	{/if}

	<ToggleReveal
		{id}
		{label}
		{variant}
		{asset}
		{size}
		{font}
		{color}
		{shape}
		{layer}
		{scroll}
		{position}
		{place}
		{align}
		{justify}
		{background}
	>
		<ToggleTree
			id={`${id}-${path}`}
			{path}
			{items}
			{size}
			{align}
			depth={0}
			{preload}
		/>
	</ToggleReveal>
</nav>
