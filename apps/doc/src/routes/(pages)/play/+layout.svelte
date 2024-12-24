<script lang="ts">
	import type {Snippet} from 'svelte'
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	type Props = {
		children: Snippet
	}

	let {children}: Props = $props()

	let nav = $derived($page.data.nav)
	let app = $derived(fatFuzzyStore.app)
</script>

<LayoutSidebar {nav} {app}>
	{#if children}
		{@render children()}
	{/if}
</LayoutSidebar>
