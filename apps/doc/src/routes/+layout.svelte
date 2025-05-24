<script lang="ts">
	import type {Snippet} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import ui from '@fat-fuzzy/ui'
	import Beacon from '$lib/ui/Beacon.svelte'

	const {Popover, Cookies} = ui.drafts

	type Props = {
		fixed?: boolean
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()
	let appContext = $derived(page.data.appContext)
	let cookiesPending = $derived(appContext.consent === undefined)
	let cookiesPartial = $derived(
		appContext.consent?.analytics || appContext.consent?.site,
	)
</script>

{#if children}
	{@render children()}
{:else}
	<p>Nothing to see here</p>
{/if}

<Popover
	id="cookies-banner"
	title="Cookies"
	asset="cookie"
	fixed={cookiesPending}
	container="burrito"
	variant="fill"
	color={cookiesPending ? 'highlight' : cookiesPartial ? 'accent' : 'primary'}
	place="bottom-right"
>
	<Cookies consent={appContext.consent} />
</Popover>

{#if !dev && appContext.consent?.analytics}
	<Beacon />
{/if}
