<script lang="ts">
	import type {ToggleLinkProps} from '$types'

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
		area,
		place,
		assetType,
	}: ToggleLinkProps = $props()
</script>

{#snippet link()}
	<a data-sveltekit-preload-data href={resolve(href)} class="font:md">
		{label}
	</a>
{/snippet}

{#snippet expander(embedLink?: boolean)}
	<ToggleReveal
		id={`toggle-${slug}`}
		label={` Toggle ${slug}`}
		{asset}
		{assetType}
		{color}
		{size}
		{variant}
		{area}
		{place}
		nav={embedLink ? link : undefined}
	>
		{#if children}
			{@render children()}
		{/if}
	</ToggleReveal>
{/snippet}

<ff-control
	class={`l:flex column size:3xs justify:between align:center ${area}:${area}`}
>
	{#if depth > 1}
		{@render expander(true)}
	{:else}
		{@render link()}
	{/if}
</ff-control>

{#if depth === 1}
	{@render expander()}
{/if}
