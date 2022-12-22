<script lang="ts">
	export let title = '';
	export let year = 0;
	export let content; // TODO: fix TypeScript
</script>

<article>
	<h1>{title}</h1>
	<p>Published: {year}</p>
	<svelte:component this={content} />
</article>
