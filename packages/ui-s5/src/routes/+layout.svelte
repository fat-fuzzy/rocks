<script lang="ts">
	import '@fat-fuzzy/style';
	let layout = 'center';
	let brightness = 'day';
	let contrast = 'contrast';
	let mainClass = `${brightness} l:${layout} bg:${contrast}`;
	let headerClass = `header-app l:center`;
	let footerClass = `l:center font:sm ${brightness} bg:${contrast}`;
</script>

<header class={headerClass}>
	<h1 class="l:flex card:md icon:svg:egg size:xl font:xl align:center">Page Title</h1>
</header>
<main class={mainClass}>
	<slot />
</main>

<footer class={footerClass}>
	<p>👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>
