<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {LayoutSidebar} = ui.content

	let {children} = $props()

	let app = $derived(fatFuzzyStore.app)
	let nav = $derived($page.data.nav)
</script>

<LayoutSidebar {nav} {app}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
