<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';

	let title: string;
	let year: string;
	let Content: ComponentType;
	$: title = $page.data.title;
	$: year = $page.data.year;
	$: Content = $page.data.Content;
</script>

<article class="l-text">
	<h1>{title}</h1>
	<p>Published: {year}</p>
	<svelte:component this={Content} />
</article>
