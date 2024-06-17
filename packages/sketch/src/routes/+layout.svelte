<script lang="ts">
	import type { Snippet } from 'svelte'
	import '@fat-fuzzy/style'
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'
	import sketchStore from '$lib/stores/stores.svelte'

const {LayoutSidebar} = content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let sketches = $state($page.data.sketches)
	let appSettings = $derived(sketchStore.app)

	let path = ''
	let items = [{ slug: 'sketches', title: 'Sketches' ,items: sketches}]

	let nav ={
		path,
		title: 'Sketches',
		id: 'nav-sketches',
		items: sketches,
		reveal: 'show',
		breakpoint: 'sm',
		size: 'sm',
		color: 'primary',
		position: 'fixed',
		place: 'left',
		background: 'polar',
		formaction: 'toggleSidebar',
	}
</script>


<LayoutSidebar {nav} redirect={$page.url.pathname} {path} app={{settings: appSettings}}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
