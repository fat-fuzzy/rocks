<script lang="ts">
	import type {Snippet} from 'svelte'
	import '@fat-fuzzy/style'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import sketchStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let sketches = $state(page.data.sketches)
	let appContext = $derived(sketchStore.app)

	let path = ''

	let nav = {
		path,
		title: 'Sketches',
		id: 'nav-sketches',
		items: sketches,
		reveal: 'expanded',
		background: 'inherit',
		breakpoint: 'sm',
		size: 'sm',
		color: 'primary',
		position: 'fixed',
		place: 'left',
		formaction: 'toggleSidebar',
	}
</script>

<LayoutSidebar {nav} app={{settings: appContext}}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
