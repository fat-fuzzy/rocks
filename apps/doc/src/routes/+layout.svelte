<script lang="ts">
	import {browser} from '$app/environment'
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {links} from '$data/nav'
	import {blocks, stores, constants} from '@fat-fuzzy/ui'

	const {Header} = blocks

	let {themes} = constants
	let {theme} = stores.theme

	let app: Element | null
	let currentTheme = themes[$theme]

	// [TODO:] check if this can be done using reactive variables ($:)
	theme.subscribe((value) => {
		if (app) {
			app.classList.remove(currentTheme)
		}
		currentTheme = themes[value]
		if (app) {
			app.classList.add(currentTheme)
		}
	})

	function getClassNameFromUrl(url: URL) {
		return url.pathname === '/' ? 'home' : url.pathname.slice(1, url.pathname.length)
	}

	$: className = getClassNameFromUrl($page.url)

	onMount(() => {
		if (browser) {
			app = document.getElementById('app')
			if (app) {
				app.classList.add(currentTheme)
			}
		}
	})
</script>

<Header className="header-app" {links} id="doc" />

<main class={className}>
	<slot />
</main>

<footer class="l:center:md">
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@forward './styles.scss'; // TODO: get back to a css import
</style>
