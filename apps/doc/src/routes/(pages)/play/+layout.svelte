<script lang="ts">
	import type {Snippet} from 'svelte'
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
	let learning = $state($page.data.sketches.learning)
	let app = $derived(fatFuzzyStore.app)
	let formId = 'sidebar'
	let reveal = $derived(
		$page.form?.formId === formId
			? $page.form.state
			: $page.data.sidebar.reveal,
	)

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
					formaction: 'toggleProjects',
					items: projects,
				},
				{
					slug: 'learning',
					title: 'Learning',
					asset: 'learning',
					formaction: 'toggleLearning',
					items: learning,
				},
			],
		},
	]

	let nav = $derived({
		path,
		title: 'Content',
		id: formId,
		items,
		reveal,
		breakpoint: 'sm',
		size: 'sm',
		color: 'primary:600',
		position: 'fixed',
		place: 'left',
		formaction: 'toggleSidebar',
	})
</script>

<LayoutSidebar {nav} {app}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
