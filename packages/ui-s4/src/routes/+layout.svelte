<script lang="ts">
	import type {LayoutData} from './$types'
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import '$lib/styles/css/tokens/main.css'
	import '$lib/styles/css/core/main.css'

	import * as settingsStore from '$lib/stores/settings'
	import format from '$lib/utils/format'
	import constants from '$lib/types/constants'
	import Header from '$lib/components/recipes/headers/Header.svelte'

	const {DEFAULT_APP_SETTINGS, APP_SETTINGS, APP_LINKS} = constants

	export let data: LayoutData

	const {nav, settings, app} = data

	let appSettings = app || DEFAULT_APP_SETTINGS

	const localStores = [
		settingsStore.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	settingsStore.app.set(app)
	settingsStore.navReveal.set(nav)
	settingsStore.settingsReveal.set(settings)

	$: brightness = appSettings.brightness
	$: contrast = appSettings.contrast
	$: pageClass = format.getClassNameFromUrl($page.url)
	$: layoutClass = APP_LINKS.find((link) => link.slug === pageClass)?.layout ?? ''
	$: mainClass = `${pageClass} ${brightness} bg:${contrast}  l:page:${layoutClass}`
	$: headerClass = `header-app ${brightness} bg:${contrast}`
	$: footerClass = `l:center font:sm ${brightness} bg:${contrast}`

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Header
	id="ui"
	title="Main navigation"
	className={headerClass}
	actionPath="/"
	formaction="toggleNav"
	redirect={$page.url.pathname}
	items={{
		links: [...APP_LINKS, {slug: 'test', title: 'Test'}],
		settings: APP_SETTINGS,
	}}
	breakpoint="xs"
/>

<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
