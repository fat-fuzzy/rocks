<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	let {children} = $props()
	let app = $derived(fatFuzzyStore.app)

	let path = ''
	let items = [
		{
			slug: 'blog',
			title: 'Blog',
			items:  $page.data.markdowns.map(({meta}) => ({
						slug: meta.slug,
						title:  meta.title,
						asset: meta.asset,
					})),
		}
	]

	let nav = {
		path,
		title: 'Content',
		id: 'nav-blog',
		items,
		reveal: 'expanded',
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		formaction: 'toggleSidebar',
	}
</script>

<LayoutSidebar {nav} redirect={$page.url.pathname} {path} {app}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
