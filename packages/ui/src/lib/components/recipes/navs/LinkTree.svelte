<script lang="ts">
	import type {LinkTreeProps, NavItem} from '$types'
	import {UiSize, UiColor} from '$types'
	import format from '$lib/utils/format.js'
	import {getStores} from '$app/stores'

	import ExpandLink from './ExpandLink.svelte'
	import LinkTree from './LinkTree.svelte'
	import constants from '$lib/types/constants.js'

	const {DEFAULT_REVEAL_STATE} = constants

	let page = getStores().page

	let {
		path = '',
		layout,
		size = UiSize['2xs'],
		color = UiColor.primary,
		shape = 'mellow',
		align,
		id,
		depth = 0,
		assetType,
		container,
		items = [],
		preload,
		oninput,
	}: LinkTreeProps = $props()

	let layoutClass = layout ? `l:${layout}:${size} l:${container}` : ''
	let colorClass = color ? `surface:1:${color}` : 'bg:inherit'
	let alignClass = align ? `align:${align}` : ''
	let shapeClass = $derived(shape ? `shape:${shape}` : `shape:mellow`)
	let depthClass = `depth-${depth}`
	let gridClass = depth === 1 ? `l:grid:auto size:xs` : layoutClass
	let linkClass = depth === 0 ? 'font:md maki:inline:2xs' : 'font:md'
</script>

{#snippet nestedLinkTree(subItems: NavItem[], slug: string, itemPath?: string)}
	<LinkTree
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
		{@const {slug, title, asset, itemPath} = item}
		{@const subItems = item.items}
		{@const buttonAssetClass = subItems && asset ? asset : ''}
		{@const linkAssetClass = !subItems && asset ? `emoji:${asset}` : ''}
		{@const itemClass = !subItems
			? `${buttonAssetClass} ${alignClass}`
			: alignClass}
		{@const reveal = {[slug]: DEFAULT_REVEAL_STATE}}
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
				<input
					type="hidden"
					name={`state-${slug}`}
					value={reveal[slug].reveal}
					oninput={(e) => {
						if (oninput) {
							oninput(e)
						}
					}}
				/>
				<ExpandLink
					{title}
					{reveal}
					{slug}
					asset={buttonAssetClass}
					href={format.formatHref(path, slug)}
					size={UiSize['2xs']}
					font={UiSize['sm']}
					actionPath={item.actionPath}
					formaction={item.formaction}
					{depth}
					assetType={depth === 2 ? 'svg' : assetType ? assetType : 'emoji'}
				>
					{@render nestedLinkTree(subItems, slug)}
				</ExpandLink>
			{:else}
				<a
					data-sveltekit-preload-data
					href={format.formatHref(itemPath ?? path, slug)}
					class={`${linkClass} ${linkAssetClass}`}
				>
					{title}
				</a>
				{#if subItems}
					{@render nestedLinkTree(subItems, slug, itemPath)}
				{/if}
			{/if}
		</li>
	{/each}
</ul>
