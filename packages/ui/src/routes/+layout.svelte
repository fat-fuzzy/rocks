<script lang="ts">
	import {browser} from '$app/environment'
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {themes} from '$lib/types/constants'
	import {theme} from '$lib/stores/theme'
	import {links} from '$lib/data/nav'
	import Header from '$lib/compositions/Header.svelte'

	let app: Element | null
	let currentTheme = themes[$theme]

	function getClassNameFromUrl(url: URL) {
		return url.pathname === '/' ? 'home' : url.pathname.slice(1, url.pathname.length)
	}

	$: className = getClassNameFromUrl($page.url)

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

	onMount(() => {
		if (browser) {
			app = document.getElementById('app')
			if (app) {
				app.classList.add(currentTheme)
			}
		}
	})
</script>

<Header className="header-app" {links} />

<main class={`l:center:md ${className}`}>
	<slot />
</main>

<footer class="l:center font:sm">
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@forward '../lib/styles/theme/ui';
</style>
