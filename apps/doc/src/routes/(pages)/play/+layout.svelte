<script lang="ts">
	import type { Snippet } from 'svelte'
	import '@fat-fuzzy/style'
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let projects = $state($page.data.sketches.projects)
	let study = $state($page.data.sketches.study)
	let app = $derived(fatFuzzyStore.app)
	let path = ''

	let items = [
		{
			slug: 'play',
			title: 'Play',
			items: [
				{
					slug: 'projects',
					title: 'Projects',
					asset: 'projects',
					items: projects,
				},
				{
					slug: 'study',
					title: 'Study',
					asset: 'study',
					items: study,
				},
			],
		},
	]

	let nav = {
		path,
		title: 'Content',
		id: 'nav-play',
		items,
		reveal: 'expanded',
		breakpoint: 'sm',
		size: 'sm',
		color: 'primary:600',
		position: 'fixed',
		place: 'left',
		formaction: 'toggleSidebar',
	}
</script>


<LayoutSidebar {nav} redirect={$page.url.pathname} {path} {app}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>

