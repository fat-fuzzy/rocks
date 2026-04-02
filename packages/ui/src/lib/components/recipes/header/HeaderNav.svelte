<script lang="ts">
	import type {ToggleNavProps, NavProps} from '$types'

	import ToggleReveal from '$lib/components/recipes/toggle-reveal/ToggleReveal.svelte'
	import styles from '$lib/utils/styles'

	let {
		id = 'header-app',
		label,
		size,
		font,
		variant,
		shape,
		color,
		asset,
		assetType,
		background,
		layout,
		breakpoint = 'xs',
		threshold,
		align,
		justify,
		dismiss,
		place,
		items,
		auto,
		path,
	}: ToggleNavProps & NavProps = $props()

	let navClasses = $derived(
		styles.getStyles({
			align,
			breakpoint,
			justify,
			layout,
			threshold,
		}),
	)
</script>

<ToggleReveal
	{id}
	{label}
	{size}
	{shape}
	{color}
	{font}
	{variant}
	{background}
	{asset}
	{assetType}
	{auto}
	{dismiss}
	{place}
	{breakpoint}
>
	<ul
		class="header-nav l:switcher:2xs size:md unstyled color:primary align:center justify:evenly w:full bg:inherit"
	>
		<li aria-current={path === '/' ? 'page' : undefined}>
			<a data-sveltekit-preload-data href="/">Home</a>
		</li>
		{#each items as { slug, label }, i (i)}
			<li aria-current={path?.startsWith(`/${slug}`) ? 'page' : undefined}>
				<a data-sveltekit-preload-data href={`/${slug}`}>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</ToggleReveal>
