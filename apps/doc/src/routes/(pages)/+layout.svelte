<script lang="ts">
	import type {Snippet} from 'svelte'
	import type FatFuzzyStore from '$lib/stores/stores.svelte'

	import {getContext} from 'svelte'
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	const {LayoutSidebar} = ui.content

	let fatFuzzyStore: FatFuzzyStore = getContext('fatFuzzyStore')
	let nav = $derived($page.data.nav)
</script>

<LayoutSidebar {nav} app={fatFuzzyStore.app}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
