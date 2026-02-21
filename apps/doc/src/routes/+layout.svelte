<script lang="ts">
	import '@fat-fuzzy/style/css'
	import type {Snippet} from 'svelte'
	import {onMount} from 'svelte'
	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import ui from '@fat-fuzzy/ui'
	import Beacon from '$lib/ui/Beacon.svelte'
	import '$lib/styles/css/main.css'

	const {Cookies, ToastGroup} = ui.drafts

	type Props = {
		children?: Snippet
	}

	let {children}: Props = $props()
	let useDarkScheme = $derived(page.data.appContext.brightness === 'night')
	let appContext = $derived({
		...page.data.appContext,
		brightness: useDarkScheme ? 'night' : 'day',
	})

	function handleThemeChange(event: MediaQueryListEvent | MediaQueryList) {
		if (!page.data.appContext.brightness) {
			useDarkScheme = event.matches ? true : false
		}
	}

	onMount(() => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
		handleThemeChange(prefersDarkScheme)
		// Listen for changes (but only apply if no saved preference)
		prefersDarkScheme.addEventListener('change', handleThemeChange)

		return () => {
			prefersDarkScheme.removeEventListener('change', handleThemeChange)
		}
	})
</script>

{#if children}
	{@render children()}
{:else}
	<p>Nothing to see here</p>
{/if}

{#if !appContext.consent}
	<Cookies
		consent={appContext.consent}
		actionPath={appContext.actionPath}
		font="lg"
	/>
{/if}

<ToastGroup />

{#if !dev && appContext.consent?.legitimateInterest}
	<Beacon />
{/if}
