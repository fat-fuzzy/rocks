<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import ui from '@fat-fuzzy/ui'
	import Beacon from '$lib/ui/Beacon.svelte'

	const {Cookies} = ui.drafts

	type Props = {
		children?: Snippet
	}

	let {children}: Props = $props()

	let useDarkScheme = $state(false)
	let appContext = $derived(page.data.appContext)

	function handleThemeChange(event: MediaQueryListEvent | MediaQueryList) {
		if (event.matches) {
			useDarkScheme = true
		} else {
			useDarkScheme = false
		}
	}

	onMount(() => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
		handleThemeChange(prefersDarkScheme)
		appContext.brightness = useDarkScheme ? 'night' : 'day'
	})
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
