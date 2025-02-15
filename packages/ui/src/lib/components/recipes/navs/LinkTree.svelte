<script lang="ts">
	import type {LinkTreeProps} from '$types'
	import {UiSize, UiColor} from '$types'
	import format from '$lib/utils/format.js'
	import {getStores} from '$app/stores'

	import ExpandLink from './ExpandLink.svelte'
	import LinkTree from './LinkTree.svelte'

	let page = getStores().page

	let {
		path = '',
		layout,
		size = UiSize['2xs'],
		color = UiColor.primary,
		align,
		id,
		depth = 0,
		container,
		items = [], // TODO: fix type,
		actionPath,
		redirect,
	}: LinkTreeProps = $props()

	let layoutClass = layout ? `l:${layout}:${size} l:${container}` : ''
	let colorClass = color ? `surface:1:${color}` : ''
	let alignClass = align ? `align:${align}` : ''
	let depthClass = `depth-${depth}`
	let gridClass = depth === 1 ? `l:grid:sm` : layoutClass
	let linkClass = depth === 0 ? 'font:md maki:inline:2xs' : 'font:md'
</script>

{#snippet nestedLinkTree(subItems, slug)}
	<LinkTree
		items={subItems}
		name={`${id}-${path}`}
		label={`${id}-${path}`}
		path={format.formatHref(path, slug)}
		id={`${id}-${slug}`}
		{layout}
		{size}
		{align}
		{actionPath}
		{redirect}
		depth={depth + 1}
	/>
{/snippet}

<ul {id} class={`${gridClass} ${depthClass}`} data-testid={id}>
	{#each items as item (item.slug)}
		{@const {slug, title, asset} = item}
		{@const subItems = item.items}
		{@const buttonAssetClass = subItems && asset ? asset : ''}
		{@const linkAssetClass = !subItems && asset ? `emoji:${asset}` : ''}
		{@const itemClass = !subItems
			? `${buttonAssetClass} ${alignClass}`
			: alignClass}
		<li
			aria-current={$page.url.pathname === format.formatHref(path, slug)
				? 'page'
				: undefined}
			class={$page.url.pathname === format.formatHref(path, slug)
				? `${itemClass} ${linkAssetClass} ${colorClass}`
				: `${itemClass} ${linkAssetClass}`}
		>
			{#if subItems && depth > 0}
				<ExpandLink
					{title}
					reveal={item.reveal}
					id={slug}
					name={slug}
					label={item.label}
					{slug}
					asset={buttonAssetClass}
					href={format.formatHref(path, slug)}
					size={UiSize['2xs']}
					formaction={item.formaction}
					{actionPath}
					{redirect}
				>
					{@render nestedLinkTree(subItems, slug)}
				</ExpandLink>
			{:else}
				<a
					data-sveltekit-preload-data
					href={format.formatHref(path, slug)}
					class={linkClass}
				>
					{title}
				</a>
				{#if subItems}
					{@render nestedLinkTree(subItems, slug)}
				{/if}
			{/if}
		</li>
	{/each}
</ul>
