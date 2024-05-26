<script lang="ts">
	import type {LinkListProps} from './nav.types.js'
	import format from '$lib/utils/format.js'
	import {getStores} from '$app/stores'

	let page = getStores().page

	let {
		path = '/',
		layout,
		size = 'md',
		color,
		align,
		id,
		depth = 0,
		container = 'burrito',
		items = [], // TODO: fix type,
	}: LinkListProps = $props()

	// TODO: clean classes output
	let layoutClass = layout ? `l:${layout}:${size} l:${container}` : ''
	let alignClass = align ? `align:${align}` : ''
	let depthClass = `depth-${depth}`
</script>

<ul id={`${id}-depth-${depth}`} class={`${layoutClass} ${depthClass}`}>
	{#each items as item}
		{@const {slug, title, asset} = item}
		{@const subItems = item.items}
		{@const assetClass = asset ? asset : ''}
		{@const itemClass = `relleno ${assetClass} ${alignClass}`}
		<li
			aria-current={$page.url.pathname === format.formatHref(path, slug)
				? 'page'
				: undefined}
			class={$page.url.pathname === format.formatHref(path, slug)
				? `${itemClass} bg:${color}`
				: itemClass}
		>
			<a data-sveltekit-preload-data href={format.formatHref(path, slug)}>
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
		</li>
	{/each}
</ul>
