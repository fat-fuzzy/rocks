<script lang="ts">
	import type {ToggleNavProps} from '$types'
	import styleHelper from '$lib/utils/styles'

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
		place = 'nord',
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

<ToggleReveal
	{id}
	{label}
	checked={true}
	{variant}
	{asset}
	{size}
	{font}
	{color}
	{shape}
	{layer}
	{scroll}
	{position}
	{area}
	{place}
	{align}
	{justify}
	{background}
>
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
		<ToggleTree
			id={`${id}-${path}`}
			{path}
			{items}
			{size}
			{align}
			{area}
			depth={0}
			{preload}
		/>
	</nav>
</ToggleReveal>
