<script lang="ts">
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {themes} from '../types/constants'
	import {theme} from '../stores/theme'
	import Header from '$lib/blocks/header/Header.svelte'

	let app
	let currentTheme = themes[$theme]

	function getClassNameFromUrl(url) {
		return url.pathname === '/' ? 'home' : url.pathname.substr(1, url.pathname.length)
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
		app = document.getElementById('app')
	})
</script>

<Header className="header-app" />

<main class="l-wrapper {className}">
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@import '../styles/main.scss';
</style>
