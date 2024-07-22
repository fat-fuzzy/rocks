<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = content

	let {children} = $props()
	let app = $derived(fatFuzzyStore.app)

	let path = ''
	let items = [
		{
			slug: 'doc',
			title: 'Doc',
			items: [
				{
					slug: 'usage',
					title: 'Usage',
					asset: 'usage',
					items: $page.data.markdowns.usages.map(({meta}) => ({
						id: meta.id,
						slug: meta.slug,
						title: meta.title,
					}))	,
				},
				{
					slug: 'decisions',
					title: 'Decisions',
					asset: 'decisions',
					items: $page.data.markdowns.decisions.map(({meta}) => ({
						id: meta.id,
						slug: meta.slug,
						title: meta.title,
					}))	,
				},
			],
		}
	]

	let nav = {
		path,
		title: 'Content',
		id: 'nav-doc',
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

<LayoutSidebar {nav} redirect={$page.url.pathname} path='' {app}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
