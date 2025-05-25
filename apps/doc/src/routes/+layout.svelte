<script lang="ts">
	import type {Snippet} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import ui from '@fat-fuzzy/ui'
	import Beacon from '$lib/ui/Beacon.svelte'

	const {Cookies} = ui.drafts

	type Props = {
		fixed?: boolean
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()
	let appContext = $derived(page.data.appContext)
</script>

{#if children}
	{@render children()}
{:else}
	<p>Nothing to see here</p>
{/if}

<Cookies consent={appContext.consent} />

{#if !dev && appContext.consent?.analytics}
	<Beacon />
{/if}
