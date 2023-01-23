<script lang="ts">
	import {page} from '$app/stores'
	import Header from './Header.svelte'
	import '$data/assets'

	function getClassNameFromUrl(url: URL) {
		return url.pathname === '/' ? 'home' : url.pathname.slice(1, url.pathname.length)
	}

	$: className = getClassNameFromUrl($page.url)
</script>

<Header />
<main class="l-center {className}">
	<slot />
</main>

<footer class="l-center">
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@import './styles.scss'; // TODO: get back to a css import
</style>
