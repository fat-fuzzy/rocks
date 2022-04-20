<script lang="ts">
	import Header from '$lib/header/Header.svelte'
</script>

<Header />

<main class="l-cover">
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@import '../styles/main.scss';

	main {
		min-height: calc(100vh - 90px);
	}
</style>
