<script lang="ts">
	import {page} from '$app/stores'
	import Header from './Header.svelte'

	function getClassNameFromUrl(url: URL) {
		return url.pathname === '/' ? 'home' : url.pathname.slice(1, url.pathname.length)
	}

	$: className = getClassNameFromUrl($page.url)
</script>

<Header />
<main class="{className}">
	<slot />
</main>

<footer class="l:center:md">
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@forward './styles.scss'; // TODO: get back to a css import
</style>
