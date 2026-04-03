<script lang="ts">
	import type {ToggleNavProps} from '$types'

	import {resolve} from '$app/paths'
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
	}: ToggleNavProps = $props()

	let navClasses = $derived(
		styles.getStyles({
			background: 'inherit',
			color,
			size,
			align,
			justify: justify ?? 'evenly',
			width: 'full',
			layout: layout ?? 'switcher',
			breakpoint,
			threshold,
		}),
	)
</script>

<ToggleReveal
	{id}
	{auto}
	{dismiss}
	{label}
	{asset}
	{assetType}
	{size}
	{font}
	{color}
	{shape}
	{variant}
	{background}
	{place}
	{breakpoint}
>
	<ul
		class="header-nav l:switcher:2xs size:md unstyled color:primary align:center justify:evenly w:full bg:inherit"
	>
		<!-- <ul class={`header-nav unstyled ${navClasses}`}> -->
		<li aria-current={path === '/' ? 'page' : undefined}>
			<a data-sveltekit-preload-data href={resolve('/')}>Home</a>
		</li>
		{#each items as { slug, label }, i (i)}
			<li aria-current={path?.startsWith(`/${slug}`) ? 'page' : undefined}>
				<a data-sveltekit-preload-data href={resolve(`/${slug}`)}>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</ToggleReveal>
