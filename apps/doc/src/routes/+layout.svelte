<script lang="ts">
	import type {Snippet} from 'svelte'
	import {onMount} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import ui from '@fat-fuzzy/ui'
	import Beacon from '$lib/ui/Beacon.svelte'

	const {Cookies, ToastGroup} = ui.drafts

	type Props = {
		children?: Snippet
	}

	let {children}: Props = $props()

	let useDarkScheme = $state(false)
	let appContext = $derived({
		...page.data.appContext,
		brightness: useDarkScheme ? 'night' : 'day',
	})

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
	})
</script>

{#if children}
	{@render children()}
{:else}
	<p>Nothing to see here</p>
{/if}

{#if !appContext.consent}
	<Cookies consent={appContext.consent} font="lg" />
{/if}

<ToastGroup />

{#if !dev && appContext.consent?.analytics}
	<Beacon />
{/if}
