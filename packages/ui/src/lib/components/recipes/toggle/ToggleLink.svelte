<script lang="ts">
	import type {ToggleLinkProps} from '$types'

	import ToggleReveal from '$lib/components/recipes/toggle/ToggleReveal.svelte'

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
		width,
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
	asset={depth === 2 ? 'chevron-right' : asset}
	assetType={depth === 2 ? 'svg' : assetType}
	{color}
	size={depth > 1 ? '3xs' : size}
	{shape}
	{variant}
	{area}
	{place}
	{layer}
	width="full"
	layout="flex"
	{depth}
	nav={link}
>
	{#if children}
		{@render children()}
	{/if}
</ToggleReveal>
