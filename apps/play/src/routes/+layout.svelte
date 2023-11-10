<script lang="ts">
	import '$lib/styles/css/tokens/main.css'
	import '@fat-fuzzy/ui/csscore'
	import {browser} from '$app/environment'
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import {links} from '$lib/data/nav'
	import {compositions, constants} from '@fat-fuzzy/ui'
	import {theme} from '$lib/stores/theme.js'

	const {Header} = compositions

	let {themes} = constants

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

<Header id="doc" className="header-app" items={links} {theme} />

<main class={className}>
	<slot />
</main>

<footer class="l:center:md">
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
