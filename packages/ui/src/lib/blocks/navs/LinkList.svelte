<script lang="ts">
	import {page} from '$app/stores'
	export let path = ''
	export let layout = `stack`
	export let size = `md`
	export let align = 'start'
	export let show = ''
	export let id = ''
	export let items: {slug: string; title: string; emoji?: string}[] = [
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

<ul {id} class={`l-${layout} ${size} ${align} ${show}`}>
	{#each items as { slug, title, emoji }}
		<li aria-current={current(slug)}>
			<a href={formatHref(slug)}>{formatTitle(title, emoji)}</a>
		</li>
	{/each}
</ul>
