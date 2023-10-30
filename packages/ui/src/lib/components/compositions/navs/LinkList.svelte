<script lang="ts">
	import format from '$lib/utils/format'
	import {getStores} from '$app/stores'

	let page = getStores().page
	export let path = ''
	export let layout = ''
	export let size = 'md'
	export let align = 'start'
	export let id = ''
	export let depth = 0
	export let items: any = [] // TODO: fix type
	let layoutClass = layout ? `l:${layout}:${size}` : ''
	let depthClass = `depth-${depth}`

	$: current = (slug: string) => $page.url.pathname === format.formatHref(path, slug)
</script>

<ul id={`${id}-depth-${depth}`} class={`${layoutClass} ${align} ${depthClass}`}>
	{#each items as item}
		{@const {slug, title, asset} = item}
		{@const subItems = item.items}
		<li aria-current={current(slug) ? 'page' : undefined}>
			<a data-sveltekit-preload-data href={format.formatHref(path, slug)}>
				{format.formatLabel(title, asset)}
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
