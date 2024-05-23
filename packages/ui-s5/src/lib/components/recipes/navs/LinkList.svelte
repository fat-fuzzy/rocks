<script lang="ts">
	import format from '$lib/utils/format'
	import {getStores} from '$app/stores'

	let page = getStores().page
	export let path = '/'
	export let layout = ''
	export let size = 'md'
	export let color = 'primary:100'
	export let align = ''
	export let id = ''
	export let depth = 0
	export let container = 'burrito'
	export let items: any = [] // TODO: fix type

	// TODO: clean classes output
	let layoutClass = layout ? `l:${layout}:${size} l:${container}` : ''
	let alignClass = align ? `align:${align}` : ''
	let depthClass = `depth-${depth}`
</script>

<ul id={`${id}-depth-${depth}`} class={`${layoutClass} ${depthClass}`}>
	{#each items as item}
		{@const {slug, title, asset} = item}
		{@const subItems = item.items}
		{@const itemClass = `relleno ${asset} ${alignClass}`}
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
