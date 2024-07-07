<script lang="ts">
	import '@fat-fuzzy/style'
	import {page} from '$app/stores'
	import {links, itemsSettings} from '$lib/data/nav'
	import {recipes, utils, constants} from '@fat-fuzzy/ui-s5'

	const {Header} = recipes
	const {DEFAULT_APP_SETTINGS, APP_LINKS} = constants

	let appSettings = $derived($page.data.app || DEFAULT_APP_SETTINGS)

	let brightness = appSettings.brightness
	let contrast = appSettings.contrast
	let pageClass = utils.format.getClassNameFromPathname($page.url.pathname)
	let layoutClass =
		APP_LINKS.find((link) => link.slug === pageClass)?.layout ?? ''
	let mainClass = `${pageClass} ${brightness} bg:${contrast} l:page:${layoutClass}`
	let headerClass = `header-app ${brightness} bg:${contrast}`
	let footerClass = `l:center font:sm ${brightness} bg:${contrast}`
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
