<script>
	import Header from './Header.svelte';

	import { blocks, layouts } from '@fat-fuzzy/ui';
	const { Sidebar } = layouts;
	const { Menu } = blocks;
</script>

<div class="app">
	<Header />
	<main class="l-wrapper">
		<Sidebar size="sm">
			<div slot="side"><Menu layout="switcher" /></div>
			<div slot="main"><slot /></div>
		</Sidebar>
	</main>

	<footer class="l-wrapper">
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style lang="scss" global>
	@import './styles.scss'; // TODO: get back to a css import
</style>
