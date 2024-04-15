<script lang="ts">
	import '@fat-fuzzy/style';
	let layout = 'stack';
	let brightness = 'day';
	let contrast = 'contrast';
	let mainClass = `${brightness} l:${layout}`;
	let headerClass = `header-app l:center:lg`;
	let footerClass = `l:center font:sm ${brightness} bg:${contrast}`;
</script>

<header class={headerClass}>
	<h1 class="l:flex card:lg icon:svg:egg size:xl align:start">Page Title</h1>
</header>
<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
