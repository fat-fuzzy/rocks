<script lang="ts">
	import type {ToggleTreeProps, NavItem} from '$types'

	import ToggleLink from './ToggleLink.svelte'
	import ToggleTree from './ToggleTree.svelte'

	let {
		pathname,
		layout,
		size = '2xs',
		color = 'primary',
		shape = 'mellow',
		layer,
		align,
		id,
		depth = 0,
		area,
		assetType,
		container,
		items = [],
		preload,
	}: ToggleTreeProps = $props()

	let containerClass = $derived(
		container ? `l:${container}:${size} l:${container}` : '',
	)
	let layoutClass = $derived(layout ? `l:${layout}:${size}` : '')
	let colorClass = $derived(color ? `surface:1:${color}` : 'bg:inherit')
	let alignClass = $derived(align ? `align:${align}` : '')
	let shapeClass = $derived(`shape:mellow`)
	let depthClass = $derived(`depth-${depth}`)
	let gridClass = $derived(
		depth === 1
			? `l:grid:auto size:xs`
			: `${layoutClass} ${containerClass}`.trim(),
	)
	let linkClass = $derived(depth === 0 ? 'font:md maki:inline:2xs' : 'font:md')
</script>

<ul
	{id}
	class={`${gridClass} ${depthClass} bg:inherit w:full`}
	data-testid={id}
	data-sveltekit-preload-data={preload ? preload : undefined}
>
	{#each items as item (item.slug)}
		{@const {slug, label, asset, actionPath} = item}
		{@const href = actionPath ?? `${pathname}/${slug}`}
		{@const subItems = item.items}
		{@const buttonAssetClass = subItems && asset ? asset : ''}
		{@const linkAssetClass = !subItems && asset ? `${assetType}:${asset}` : ''}
		{@const itemClass = !subItems
			? `${buttonAssetClass} ${alignClass}`
			: alignClass}
		<li
			aria-current={pathname === href ? 'page' : undefined}
			class={pathname === href
				? `${itemClass} ${colorClass} ${shapeClass}`
				: `${itemClass} ${shapeClass}`}
		>
			{#if subItems && depth > 0}
				<ToggleLink
					{label}
					{slug}
					{area}
					asset={buttonAssetClass}
					{href}
					size="xs"
					font="sm"
					place="nord"
					{shape}
					{layer}
					{depth}
					width="full"
					assetType={depth === 2 ? 'svg' : assetType ? assetType : 'emoji'}
				>
					{@render nestedLinkTree(subItems, slug)}
				</ToggleLink>
			{:else}
				<a
					data-sveltekit-preload-data
					{href}
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
		{pathname}
		{layout}
		{size}
		{align}
		{layer}
		depth={depth + 1}
		{shape}
		width="full"
	/>
{/snippet}
