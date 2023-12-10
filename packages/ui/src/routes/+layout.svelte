<script lang="ts">
	import type {LayoutData} from './$types'
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import '$lib/styles/css/tokens/main.css'
	import '$lib/styles/css/core/main.css'

	import * as settingsStore from '$lib/stores/settings'
	import format from '$lib/utils/format'
	import {links, itemsSettings} from '$lib/api/fixtures/js/nav'
	import Header from '$lib/components/compositions/headers/Header.svelte'

	export let data: LayoutData

	const {nav, sidebar, settings, app} = data

	let appSettings: {[key: string]: string} = {brightness: 'day', contrast: 'night'}

	const stores = [
		settingsStore.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]
	settingsStore.app.set(app)
	settingsStore.navReveal.set(nav)
	settingsStore.sidebarReveal.set(sidebar)
	settingsStore.settingsReveal.set(settings)
	settingsStore.sidebarReveal.set(sidebar)

	$: brightness = appSettings.brightness
	$: contrast = appSettings.contrast
	$: pageClass = format.getClassNameFromUrl($page.url)
	$: mainClass = `${pageClass} ${brightness} bg:${contrast}`
	$: headerClass = `header-app ${brightness} bg:${contrast}`
	$: footerClass = `l:center font:sm ${brightness} bg:${contrast}`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Header
	id="ui"
	className={headerClass}
	actionPath="/"
	formaction="toggleNav"
	redirect={$page.url.pathname}
	items={{links, settings: itemsSettings}}
	breakpoint="xs"
/>

<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
