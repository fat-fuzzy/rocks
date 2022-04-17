<script lang="ts">
	import Header from '$lib/header/Header.svelte'
</script>

<Header />

<main class="l-sidebar">
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style lang="scss" global>
	@import '../styles/main.scss';
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100ù;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: getVar(padding-sm);
	}

	footer a {
		font-weight: bold;
	}
</style>
