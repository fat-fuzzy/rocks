<script lang="ts">
	import {page} from '$app/stores'

	$: decisions = $page.data.decisions

	let title = 'Fat Fuzzy Decisions'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>Fat Fuzzy Decisions</h1>
</header>

{#each decisions as { meta, path }}
	<a class="font:xxl" href={`/decisions/${path}`}>{meta.id} {meta.title}</a>
{/each}
