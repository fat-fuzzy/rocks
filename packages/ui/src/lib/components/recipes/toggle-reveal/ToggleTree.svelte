<script lang="ts">
	import type {LinkTreeProps, NavItem} from '@fat-fuzzy/ui'
	import ui from '@fat-fuzzy/ui'
	import {getStores} from '$app/stores'

	import ToggleLink from './ToggleLink.svelte'
	import ToggleTree from './ToggleTree.svelte'

	let page = getStores().page
	const {format} = ui.utils

	let {
		path = '',
		layout,
		size = '2xs',
		color = 'primary',
		shape = 'mellow',
		align,
		id,
		depth = 0,
		assetType,
		container,
		items = [],
		preload,
	}: LinkTreeProps = $props()

	let layoutClass = $derived(layout ? `l:${layout}:${size} l:${container}` : '')
	let colorClass = $derived(color ? `surface:1:${color}` : 'bg:inherit')
	let alignClass = $derived(align ? `align:${align}` : '')
	let shapeClass = $derived(shape ? `shape:${shape}` : `shape:mellow`)
	let depthClass = $derived(`depth-${depth}`)
	let gridClass = $derived(depth === 1 ? `l:grid:auto size:xs` : layoutClass)
	let linkClass = $derived(depth === 0 ? 'font:md maki:inline:2xs' : 'font:md')
</script>

{#snippet nestedLinkTree(subItems: NavItem[], slug: string, itemPath?: string)}
	<ToggleTree
		items={subItems}
		path={format.formatHref(itemPath ?? path, slug)}
		id={`${id}-${slug}`}
		{layout}
		{size}
		{align}
		depth={depth + 1}
	/>
{/snippet}

<ul
	{id}
	class={`${gridClass} ${depthClass} bg:inherit`}
	data-testid={id}
	data-sveltekit-preload-data={preload ? preload : undefined}
>
	{#each items as item (item.slug)}
		{@const {slug, label, asset, reveal, itemPath} = item}
		{@const subItems = item.items}
		{@const buttonAssetClass = subItems && asset ? asset : ''}
		{@const linkAssetClass = !subItems && asset ? `emoji:${asset}` : ''}
		{@const itemClass = !subItems
			? `${buttonAssetClass} ${alignClass}`
			: alignClass}
		<li
			aria-current={$page.url.pathname ===
			format.formatHref(itemPath ?? path, slug)
				? 'page'
				: undefined}
			class={$page.url.pathname === format.formatHref(itemPath ?? path, slug)
				? `${itemClass} ${colorClass} ${shapeClass}`
				: `${itemClass} ${shapeClass}`}
		>
			{#if subItems && depth > 0}
				<ToggleLink
					{label}
					{slug}
					asset={buttonAssetClass}
					href={format.formatHref(path, slug)}
					size="2xs"
					font="sm"
					actionPath={item.actionPath}
					formaction={item.formaction}
					{depth}
					assetType={depth === 2 ? 'svg' : assetType ? assetType : 'emoji'}
				>
					{@render nestedLinkTree(subItems, slug)}
				</ToggleLink>
			{:else}
				<a
					data-sveltekit-preload-data
					href={format.formatHref(itemPath ?? path, slug)}
					class={`${linkClass} ${linkAssetClass}`}
				>
					{label}
				</a>
				{#if subItems}
					{@render nestedLinkTree(subItems, slug, itemPath)}
				{/if}
			{/if}
		</li>
	{/each}
</ul>
