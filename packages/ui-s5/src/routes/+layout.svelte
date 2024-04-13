<script lang="ts">
	import '@fat-fuzzy/style/css';
	let layout = 'l:stack';
	let brightness = 'day';
	let contrast = 'contrast';
	let mainClass = `${brightness} bg:${contrast}  l:${layout}`;
	let headerClass = `header-app ${brightness} bg:${contrast}`;
	let footerClass = `l:center font:sm ${brightness} bg:${contrast}`;
</script>

<header class={headerClass}><h1>Page Title</h1></header>
<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
</style>
