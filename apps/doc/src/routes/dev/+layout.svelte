<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {LayoutSidebar} = content

	let {children} = $props()
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

	let nav ={
		path,
		title: 'Fat Fuzzy Dev',
		id: 'nav-dev',
		items,
		reveal: 'show',
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		background: 'polar',
		formaction: 'toggleSidebar',
	}
</script>

<LayoutSidebar {nav} redirect={$page.url.pathname} {path}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Doc Coming Soon!</p>
	{/if}
</LayoutSidebar>
