<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	let {children} = $props()

	let {markdowns} = $state($page.data)
	let app = $derived(fatFuzzyStore.app)
	let formId = 'sidebar'

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
					formaction: 'toggleUsage',
					items: markdowns.usages.map(({meta}) => ({
						id: meta.id,
						slug: meta.slug,
						title: meta.title,
						asset: meta.asset,
					})),
				},
				{
					slug: 'decisions',
					title: 'Decisions',
					asset: 'decisions',
					formaction: 'toggleDecisions',
					items: markdowns.decisions.map(({meta}) => ({
						id: meta.id,
						slug: meta.slug,
						title: meta.title,
						asset: meta.asset,
					})),
				},
			],
		},
	]

	let nav = $derived({
		path,
		title: 'Content',
		id: formId,
		items,
		reveal: $page.data.sidebar.reveal,
		breakpoint: 'sm',
		size: 'md',
		color: 'primary:600',
		position: 'sticky',
		place: 'left',
		formaction: 'toggleSidebar',
	})
</script>

<LayoutSidebar {nav} {app}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
