<script lang="ts">
	import {onDestroy} from 'svelte'
	import '@fat-fuzzy/style'

	import {page} from '$app/stores'
	import {links, itemsSettings} from '$lib/data/nav'
	import {recipes, stores, utils, constants} from '@fat-fuzzy/ui'

	const {Header} = recipes
	const {settings} = stores
	const {DEFAULT_APP_SETTINGS, APP_LINKS} = constants

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
	$: layoutClass =
		APP_LINKS.find((link) => link.slug === pageClass)?.layout ?? ''
	$: mainClass = `${pageClass} ${brightness} bg:${contrast} l:page:${layoutClass}`
	$: headerClass = `header-app ${brightness} bg:${contrast}`
	$: footerClass = `l:center font:sm ${brightness} bg:${contrast}`

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
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
	<p>
		👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>
