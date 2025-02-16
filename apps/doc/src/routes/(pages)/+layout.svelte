<script lang="ts">
	import type {Snippet} from 'svelte'

	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	const {LayoutSidebar} = ui.content

	let sidebar = $derived(page.data.sidebar)
	let settings = $derived(page.data.settings)
</script>

<LayoutSidebar nav={sidebar} app={settings} size="md">
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutSidebar>
