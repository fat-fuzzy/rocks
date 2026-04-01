<script lang="ts">
	import type {ExpandLinkProps} from '@fat-fuzzy/ui'

	import ToggleReveal from '$lib/components/recipes/toggle-reveal/ToggleReveal.svelte'

	let {
		href,
		slug,
		color,
		size,
		variant = 'bare',
		label,
		asset,
		children,
		depth,
		assetType,
	}: ExpandLinkProps = $props()
</script>

{#snippet expander()}
	<ToggleReveal
		id={`toggle-${slug}`}
		label={` Toggle ${slug}`}
		{asset}
		{assetType}
		{color}
		{size}
		{variant}
	>
		<ff-reveal id={`links-${slug}`} class="bg:inherit">
			{#if children}
				{@render children()}
			{/if}
		</ff-reveal>
	</ToggleReveal>
{/snippet}

<ff-control class="l:flex nowrap size:3xs justify:between align:center">
	{#if depth > 1}
		{@render expander()}
	{/if}
	<a data-sveltekit-preload-data {href} class="font:md">
		{label}
	</a>
	{#if depth === 1}
		{@render expander()}
	{/if}
</ff-control>
