<script>
	import Header from './Header.svelte';
</script>

<Header />
<main class="l-burrito">
	<slot />
</main>

<footer class="l-burrito">
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@import './styles.scss'; // TODO: get back to a css import
</style>
