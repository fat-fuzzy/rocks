<script lang="ts">
	import {browser} from '$app/environment'
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {themes} from '$lib/types/constants'
	import {theme} from '$lib/stores/theme'
	import Header from '$lib/blocks/header/Header.svelte'

	let app: Element | null
	let currentTheme = themes[$theme]

	function getClassNameFromUrl(url: URL) {
		return url.pathname === '/' ? 'home' : url.pathname.slice(1, url.pathname.length)
	}

	$: className = getClassNameFromUrl($page.url)

	theme.subscribe((value) => {
		if (app) {
			app.classList.remove(currentTheme)
		}
		currentTheme = themes[value]
		if (app) {
			app.classList.add(currentTheme)
		}
	})

	onMount(() => {
		if (browser) {
			app = document.getElementById('app')
			if (app) {
				app.classList.add(currentTheme)
			}
		}
	})
</script>

<Header className="header-app" page={$page} />

<main class="l-wrapper {className}">
	<slot />
</main>

<footer class="l-wrapper font-size:sm">
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@import '../lib/styles/styles-default.scss';
</style>
