<script lang="ts">
	import type {LinkListProps} from './nav.types.js'
	import format from '$lib/utils/format.js'
	import {getStores} from '$app/stores'

	import ExpandLink from './ExpandLink.svelte'
	import constants from '$lib/types/constants.js'

	const {DEFAULT_REVEAL_STATE} = constants

	let page = getStores().page

	let {
		path = '/',
		layout,
		size = 'xs',
		color = 'primary:600',
		align,
		id,
		depth = 0,
		container,
		items = [], // TODO: fix type,
	}: LinkListProps = $props()

	// TODO: clean classes output
	let containerClass =
		container === 'content'
			? container
			: container
				? `l:${container}:${size}`
				: ''
	let layoutClass = layout ? `l:${layout}:${size} l:${container}` : ''
	let colorClass = color ? `bg:${color}` : ''
	let alignClass = align ? `align:${align}` : ''
	let depthClass = `depth-${depth}`
	let gridClass = depth === 1 ? `l:grid:xs` : layoutClass
</script>

<ul
	id={`${id}-depth-${depth}`}
	class={`${containerClass} ${gridClass} ${depthClass}`}
>
	{#each items as item (item.slug)}
		{@const {slug, title, asset} = item}
		{@const subItems = item.items}
		{@const assetClass = asset ? asset : ''}
		{@const itemClass = `${assetClass} ${alignClass}`}
		{@const reveal = {[slug]: DEFAULT_REVEAL_STATE}}
		<li
			aria-current={$page.url.pathname === format.formatHref(path, slug)
				? 'page'
				: undefined}
			class={$page.url.pathname === format.formatHref(path, slug)
				? `${itemClass} ${colorClass}`
				: itemClass}
		>
			{#if subItems && depth > 0}
				<ExpandLink
					{title}
					{reveal}
					{slug}
					href={format.formatHref(path, slug)}
				>
					<svelte:self
						items={subItems}
						path={format.formatHref(path, slug)}
						id={`${id}-${slug}`}
						{layout}
						{size}
						{align}
						depth={depth + 1}
					/>
				</ExpandLink>
			{:else}
				<a data-sveltekit-preload-data href={format.formatHref(path, slug)}>
					{title}
				</a>{#if subItems}
					<svelte:self
						items={subItems}
						path={format.formatHref(path, slug)}
						id={`${id}-${slug}`}
						{layout}
						{size}
						{align}
						depth={depth + 1}
					/>
				{/if}
			{/if}
		</li>
	{/each}
</ul>
