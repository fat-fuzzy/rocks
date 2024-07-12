<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = content

	let {children} = $props()
	let app = $derived(fatFuzzyStore.app)

	let path = ''
	let items = [
		{
			slug: 'dev',
			title: 'Dev',
			items: $page.data.markdowns.map(({meta}) => ({
				id: meta.id,
				slug: meta.slug,
				title: meta.title,
			})),
		},
	]

	let nav = {
		path,
		title: 'Fat Fuzzy Dev',
		id: 'nav-dev',
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
		<p class="feedback bare emoji:default">Doc Coming Soon!</p>
	{/if}
</LayoutSidebar>
