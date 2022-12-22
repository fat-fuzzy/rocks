<script lang="ts">
	import { page } from '$app/stores';
	const { decisions } = $page.data;
</script>

<header class="header-page">
	<h1>Fat Fuzzy Decisions</h1>
</header>

{#each decisions as { meta, path }}
	<a class="font:xxl" href={`/decisions/${path}`}>{meta.id} {meta.title}</a>
{/each}
