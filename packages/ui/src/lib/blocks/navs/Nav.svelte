<script lang="ts">
	import {page} from '$app/stores'
	export let layout = `stack`
	export let size = `md`
	export let path = '/'
	export let items: {slug: string; title: string; emoji?: string}[] = [
		{slug: '', title: 'Home'},
		{slug: 'about', title: 'About'},
	]

	function formatTitle(title, emoji) {
		return emoji ? `${emoji} ${title}` : title
	}
	function formatHref(slug) {
		return path ? `${path} ${slug}` : slug
	}

	$: current = (slug: string) => ($page.url.pathname === formatHref(slug) ? 'page' : undefined)
</script>

<nav class={`l-${layout} ${size}`}>
	<ul role="group">
		{#each items as { slug, title, emoji }}
			<li aria-current={current(slug)}>
				<a href={formatHref(slug)}>{formatTitle(title, emoji)}</a>
			</li>
		{/each}
	</ul>
</nav>
