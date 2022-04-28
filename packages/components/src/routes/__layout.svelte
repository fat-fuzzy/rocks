<script lang="ts">
	import {onMount} from 'svelte'
	import {page} from '$app/stores'
	import Header from '../lib/header/Header.svelte'
	import {theme} from '../stores'

	function getClassNameFromUrl(url) {
		return url.pathname === '/' ? 'home' : url.pathname.substr(1, url.pathname.length)
	}
	$: className = getClassNameFromUrl($page.url)

	onMount(() => {
		theme.set(1)
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
