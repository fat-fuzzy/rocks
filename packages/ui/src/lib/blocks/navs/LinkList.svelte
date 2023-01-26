<script lang="ts">
	import {page} from '$app/stores'
	import format from '../../utils/format'
	import fixtures from '../../../data/fixtures'

	export let path = ''
	export let layout = ''
	export let size = 'md'
	export let align = 'start'
	export let id = 'list'
	export let depth = 0
	export let items: {slug: string; title: string; emoji?: string; items?: []}[] = fixtures.links
	let layoutClass = layout ? `l-${layout}` : ''
	let depthClass = `depth-${depth}`

	// Use to highlight leaf node but not its children (if any)
	function currentItem(slug: string) {
		const currentItem = $page.url.pathname === format.formatHref(path, slug)
		return currentItem
	}
</script>

<ul id={`${id}-depth-${depth}`} class={`${layoutClass} ${size} ${align} ${depthClass}`}>
	{#each items as item}
		{@const {slug, title, emoji} = item}
		{@const subItems = item.items}
		<li aria-current={currentItem(slug) ? 'page' : undefined}>
			<a data-sveltekit-preload-data href={format.formatHref(path, slug)}>
				{format.formatLabel(title, emoji)}
			</a>
			{#if subItems}
				<svelte:self
					items={subItems}
					path={format.formatHref(path, slug)}
					id={`${slug}-${id}`}
					{layout}
					{size}
					{align}
					depth={depth + 1}
				/>
			{/if}
		</li>
	{/each}
</ul>
