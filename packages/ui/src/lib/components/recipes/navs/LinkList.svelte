<script lang="ts">
	import type {LinkListProps} from '$types'
	import {UiSize, UiColor} from '$types'
	import format from '$lib/utils/format.js'
	import {getStores} from '$app/stores'

	import ExpandLink from './ExpandLink.svelte'
	import LinkList from './LinkList.svelte'
	import constants from '$lib/types/constants.js'

	const {DEFAULT_REVEAL_STATE} = constants

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
		redirect,
		items = [], // TODO: fix type,
		oninput,
	}: LinkListProps = $props()

	// TODO: clean classes output
	let containerClass =
		container === 'content'
			? container
			: container
				? `l:${container}:${size}`
				: ''
	let layoutClass = layout ? `l:${layout}:${size} l:${container}` : ''
	let colorClass = color ? `surface:1:${color}` : ''
	let alignClass = align ? `align:${align}` : ''
	let depthClass = `depth-${depth}`
	let gridClass = depth === 1 ? `l:grid:sm` : layoutClass
	let linkClass = depth === 0 ? 'font:md maki:inline:2xs' : 'font:md'
</script>

{#snippet nestedLinkList(subItems, slug)}
	<LinkList
		items={subItems}
		path={format.formatHref(path, slug)}
		id={`${id}-${slug}`}
		{layout}
		{size}
		{align}
		depth={depth + 1}
	/>
{/snippet}

<ul
	{id}
	class={`${containerClass} ${gridClass} ${depthClass}`}
	data-testid={id}
>
	{#each items as item (item.slug)}
		{@const {slug, title, asset} = item}
		{@const subItems = item.items}
		{@const buttonAssetClass = subItems && asset ? asset : ''}
		{@const linkAssetClass = !subItems && asset ? `emoji:${asset}` : ''}
		{@const itemClass = !subItems
			? `${buttonAssetClass} ${alignClass}`
			: alignClass}
		{@const reveal = {[slug]: DEFAULT_REVEAL_STATE}}
		<li
			aria-current={$page.url.pathname === format.formatHref(path, slug)
				? 'page'
				: undefined}
			class={$page.url.pathname === format.formatHref(path, slug)
				? `${itemClass} ${linkAssetClass} ${colorClass}`
				: `${itemClass} ${linkAssetClass}`}
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
					formaction={`?/${item.formaction}`}
				>
					{@render nestedLinkList(subItems, slug)}
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
					{@render nestedLinkList(subItems, slug)}
				{/if}
			{/if}
		</li>
	{/each}
</ul>
