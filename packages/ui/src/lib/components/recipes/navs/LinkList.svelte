<script lang="ts">
	import type {LinkListProps} from './nav.types.js'
	import format from '$lib/utils/format.js'
	import {getStores} from '$app/stores'

	import ExpandLink from './ExpandLink.svelte'
	import constants from '$lib/types/constants.js'

	const {DEFAULT_REVEAL_STATE} = constants

	let page = getStores().page

	let {
		path = '',
		layout,
		size = '2xs',
		color = 'primary',
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
	let colorClass = color ? `surface:1:${color}` : ''
	let alignClass = align ? `align:${align}` : ''
	let depthClass = `depth-${depth}`
	let gridClass = depth === 1 ? `l:grid:sm` : layoutClass
	let linkClass = depth === 0 ? 'font:md maki:inline:2xs' : 'font:md'
</script>

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
				<ExpandLink
					{title}
					{reveal}
					{slug}
					asset={buttonAssetClass}
					href={format.formatHref(path, slug)}
					size="2xs"
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
				<a
					data-sveltekit-preload-data
					href={format.formatHref(path, slug)}
					class={linkClass}
				>
					{title}
				</a>
				{#if subItems}
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
