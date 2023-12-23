<script lang="ts">
	import {onDestroy} from 'svelte'
	import '$lib/styles/css/tokens/main.css'
	import '@fat-fuzzy/ui/csscore'

	import {page} from '$app/stores'
	import {links, itemsSettings} from '$data/nav'
	import {recipes, stores, utils, constants} from '@fat-fuzzy/ui'

	const {Header} = recipes
	const {settings} = stores
	const {DEFAULT_APP_SETTINGS} = constants

	let appSettings = $page.data.app || DEFAULT_APP_SETTINGS

	const localStores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	$: brightness = appSettings.brightness
	$: contrast = appSettings.contrast
	$: pageClass = utils.format.getClassNameFromUrl($page.url)
	$: mainClass = `${pageClass} ${brightness} bg:${contrast}`
	$: headerClass = `header-app ${brightness} bg:${contrast}`
	$: footerClass = `l:center font:sm ${brightness} bg:${contrast}`

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Header
	id="doc"
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
