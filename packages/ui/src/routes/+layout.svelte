<script lang="ts">
	import type {LayoutData} from './$types'
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import '$lib/styles/css/tokens/main.css'
	import '$lib/styles/css/core/main.css'

	import * as settingsStore from '$lib/stores/settings'
	import format from '$lib/utils/format'
	import constants from '$lib/types/constants'
	import {APP_SETTINGS, APP_LINKS} from '$data/app-ui'
	import Header from '$lib/components/compositions/headers/Header.svelte'

	const {DEFAULT_APP_SETTINGS} = constants

	export let data: LayoutData

	const {nav, sidebar, settings, app} = data

	let appSettings = app || DEFAULT_APP_SETTINGS

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
	title="Main navigation"
	className={headerClass}
	actionPath="/"
	formaction="toggleNav"
	redirect={$page.url.pathname}
	items={{links: APP_LINKS, settings: APP_SETTINGS}}
	breakpoint="xs"
/>

<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
