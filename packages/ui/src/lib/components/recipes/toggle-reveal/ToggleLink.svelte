<script lang="ts">
	import type {ToggleLinkProps} from '$types'

	import ToggleReveal from '$lib/components/recipes/toggle-reveal/ToggleReveal.svelte'

	let {
		href,
		slug,
		color,
		size,
		shape,
		layer,
		variant = 'bare',
		label,
		asset,
		children,
		depth,
		area,
		place,
		assetType,
	}: ToggleLinkProps = $props()
</script>

{#snippet link()}
	<a data-sveltekit-preload-data {href} class="font:md">
		{label}
	</a>
{/snippet}

<ToggleReveal
	id={`toggle-${slug}`}
	label={` Toggle ${slug}`}
	{asset}
	{assetType}
	{color}
	{size}
	{shape}
	{variant}
	{area}
	{place}
	{layer}
	layout="flex"
	nav={depth <= 1 ? link : undefined}
>
	{#if children}
		{@render children()}
	{/if}
</ToggleReveal>
