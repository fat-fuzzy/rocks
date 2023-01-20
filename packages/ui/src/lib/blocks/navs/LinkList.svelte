<script lang="ts">
	import {page} from '$app/stores'
	import format from '../../utils/format'

	export let path = ''
	export let layout = ''
	export let size = 'md'
	export let align = 'start'
	export let id = 'list'
	export let depth = 0
	export let items: {slug: string; title: string; emoji?: string; items?: []}[] = [
		{slug: '', title: 'Home'},
		{slug: 'about', title: 'About'},
	]

	let layoutClass = layout ? `l-${layout}` : ''
	let depthClass = `depth-${depth}`

	$: current = (slug: string) =>
		$page.url.pathname === format.formatHref(path, slug) ? 'page' : undefined
</script>

<ul id={`${id}-depth-${depth}`} class={`${layoutClass} ${size} ${align} ${depthClass}`}>
	{#each items as item}
		{@const {slug, title, emoji} = item}
		{@const subItems = item.items}
		<li aria-current={current(slug)}>
			<a data-sveltekit-preload-data href={format.formatHref(path, slug)}
				>{format.formatLabel(title, emoji)}</a
			>
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
