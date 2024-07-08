<script lang="ts">
	import type { Snippet } from 'svelte'
	import '@fat-fuzzy/style'
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

const {LayoutSidebar} = content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let sketches = $state($page.data.sketches)
	let app = $derived(fatFuzzyStore.app)
	let path = '/play'

	let nav ={
		path,
		title: 'Sketches',
		id: 'nav-sketches',
		items: sketches,
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
