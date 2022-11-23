<script>
	import Header from './Header.svelte'
	import {getStyles} from '@fat-fuzzy/ui'
	getStyles('client')
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style lang="scss" global>
	@import './styles.scss'; // TODO: get back to a css import
</style>
