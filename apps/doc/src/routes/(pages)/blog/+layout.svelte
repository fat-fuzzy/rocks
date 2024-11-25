<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	let {children} = $props()
	let app = $derived(fatFuzzyStore.app)
	let formId = 'nav-blog'
	let reveal = $derived(
		$page.form?.formId === formId
			? $page.form.state
			: $page.data.sidebar.reveal,
	)

	let path = ''
	let items = [
		{
			slug: 'blog',
			title: 'Blog',
			items: $page.data.markdowns.map(({meta}) => ({
				slug: meta.slug,
				title: meta.title,
				asset: meta.asset,
			})),
		},
	]

	let nav = $derived({
		path,
		title: 'Content',
		id: formId,
		items,
		reveal,
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
