<script lang="ts">
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import '$lib/styles/css/tokens/main.css'
	import '$lib/styles/css/core/main.css'

	import * as settings from '$lib/stores/settings'
	import {links} from '$lib/api/fixtures/js/nav'
	import Header from '$lib/components/compositions/headers/Header.svelte'

	let appSettings: {[key: string]: string} = {brightness: 'day', contrast: 'night'}

	const stores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	function getClassNameFromUrl(url: URL) {
		return url.pathname === '/' ? 'home' : url.pathname.slice(1, url.pathname.length)
	}

	$: brightness = appSettings.brightness
	$: contrast = appSettings.contrast
	$: pageClass = getClassNameFromUrl($page.url)
	$: mainClass = `${pageClass} ${brightness} bg:${contrast}`
	$: headerClass = `header-app ${brightness} bg:${contrast}`
	$: footerClass = `l:center font:sm ${brightness} bg:${contrast}`

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Header id="ui" className={headerClass} path={$page.url.pathname} {links} breakpoint="xs" />

<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
