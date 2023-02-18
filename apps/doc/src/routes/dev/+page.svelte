<script lang="ts">
	import {page} from '$app/stores'

	$: markdowns = $page.data.markdowns

	let title = 'Fat Fuzzy Dev'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<div class="l:stack:md">
	{#each markdowns as { meta }}
		<a class="font:xxl" href={`/dev/${meta.slug}`}>{meta.title}</a>
	{/each}
</div>
