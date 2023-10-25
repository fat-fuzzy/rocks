<script lang="ts">
	import {page} from '$app/stores'

	$: markdowns = $page.data.markdowns

	let title = 'Fat Fuzzy Log'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="card:xl bg:polar">
	<h1>{title}</h1>
</header>

<div class="l:stack">
	{#each markdowns as { meta }}
		<a class="font:xxl" href={`/log/${meta.slug}`}>{meta.title}</a>
	{/each}
</div>
