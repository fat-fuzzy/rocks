<script lang="ts">
	import type {ToggleTreeProps, NavItem} from '$types'

	import {resolve} from '$app/paths'
	import ToggleLink from './ToggleLink.svelte'
	import ToggleTree from './ToggleTree.svelte'
	import format from '$lib/utils/format'

	let {
		pathname,
		layout,
		size = '2xs',
		color = 'primary',
		shape = 'mellow',
		align,
		id,
		depth = 0,
		area,
		assetType,
		container,
		items = [],
		preload,
		url,
	}: ToggleTreeProps = $props()

	let layoutClass = $derived(layout ? `l:${layout}:${size} l:${container}` : '')
	let colorClass = $derived(color ? `surface:1:${color}` : 'bg:inherit')
	let alignClass = $derived(align ? `align:${align}` : '')
	let shapeClass = $derived(shape ? `shape:${shape}` : `shape:mellow`)
	let depthClass = $derived(`depth-${depth}`)
	let gridClass = $derived(depth === 1 ? `l:grid:auto size:xs` : layoutClass)
	let linkClass = $derived(depth === 0 ? 'font:md maki:inline:2xs' : 'font:md')
</script>

<ul
	{id}
	class={`${gridClass} ${depthClass} bg:inherit ff-reveal`}
	data-testid={id}
	data-sveltekit-preload-data={preload ? preload : undefined}
>
	{#each items as item (item.slug)}
		{@const {slug, label, asset, actionPath} = item}
		{@const subItems = item.items}
		{@const buttonAssetClass = subItems && asset ? asset : ''}
		{@const linkAssetClass = !subItems && asset ? `emoji:${asset}` : ''}
		{@const itemClass = !subItems
			? `${buttonAssetClass} ${alignClass}`
			: alignClass}
		<li
			aria-current={pathname === actionPath ? 'page' : undefined}
			class={pathname === format.formatHref(actionPath ?? pathname, slug)
				? `${itemClass} ${colorClass} ${shapeClass}`
				: `${itemClass} ${shapeClass}`}
		>
			{#if subItems && depth > 0}
				<ToggleLink
					{label}
					{slug}
					{area}
					asset={buttonAssetClass}
					href={`${pathname}/${slug}`}
					size="2xs"
					font="sm"
					place="nord"
					{depth}
					assetType={depth === 2 ? 'svg' : assetType ? assetType : 'emoji'}
				>
					{@render nestedLinkTree(subItems, slug)}
				</ToggleLink>
			{:else}
				<a
					data-sveltekit-preload-data
					href={url?.pathname
						? `${url?.pathname}/${item.slug}`
						: `${pathname}/${item.slug}`}
					class={`${linkClass} ${linkAssetClass}`}
				>
					{label}
				</a>
				{#if subItems}
					{@render nestedLinkTree(subItems, slug)}
				{/if}
			{/if}
		</li>
	{/each}
</ul>

{#snippet nestedLinkTree(subItems: NavItem[], slug: string)}
	<ToggleTree
		id={slug}
		items={subItems}
		pathname={`/${slug}`}
		{url}
		{layout}
		{size}
		{align}
		depth={depth + 1}
	/>
{/snippet}
