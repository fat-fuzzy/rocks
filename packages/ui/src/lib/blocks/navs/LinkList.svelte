<script lang="ts">
	import {page} from '$app/stores'
	export let path = ''
	export let layout = ''
	export let size = 'md'
	export let align = 'start'
	export let show = ''
	export let id = ''
	export let depth = 0
	export let items: {slug: string; title: string; emoji?: string; items?: []}[] = [
		{slug: '', title: 'Home'},
		{slug: 'about', title: 'About'},
	]

	function formatTitle(title, emoji) {
		return emoji ? `${emoji} ${title}` : title
	}
	function formatHref(slug) {
		return `${path}/${slug}`
	}

	$: current = (slug: string) => ($page.url.pathname === formatHref(slug) ? 'page' : undefined)
</script>

<ul {id} class={`l-${layout} ${size} ${align} ${show} depth-${depth}`}>
	{#each items as item}
		{@const {slug, title, emoji} = item}
		{@const subItems = item.items}
		<li aria-current={current(slug)}>
			<a data-sveltekit-preload-data href={formatHref(slug)}>{formatTitle(title, emoji)}</a>
			{#if subItems}
				<svelte:self
					items={subItems}
					path={formatHref(slug)}
					{layout}
					{size}
					{align}
					depth={depth + 1}
				/>
			{/if}
		</li>
	{/each}
</ul>
