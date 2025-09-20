<script lang="ts">
	import type {Snippet} from 'svelte'

	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	const {LayoutSidebar} = ui.content

	let sidenav = $derived(page.data.sidebar)
	let appContext = $derived(page.data.appContext)
</script>

<LayoutSidebar {sidenav} app={appContext}>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
