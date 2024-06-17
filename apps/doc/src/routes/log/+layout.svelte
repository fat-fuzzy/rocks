<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = content

	let {children} = $props()
	let appSettings = $derived(fatFuzzyStore.app)

	let path = ''
	let items = [
		{
			slug: 'log',
			title: 'Log',
			items: $page.data.markdowns.map(({meta, path}) => ({
				id: meta.id,
				slug: meta.slug,
				title: meta.title,
			})),
		},
	]

	let nav ={
		path,
		title: 'Fat Fuzzy Log',
		id: 'nav-log',
		items,
		reveal: 'show',
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		formaction: 'toggleSidebar',
	}
</script>

<LayoutSidebar {nav} redirect={$page.url.pathname} path='' app={appSettings}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Doc Coming Soon!</p>
	{/if}
</LayoutSidebar>
