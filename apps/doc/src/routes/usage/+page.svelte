<script lang="ts">
	import {page} from '$app/stores'

	$: usages = $page.data.usages

	let title = 'Fat Fuzzy Usage'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<div class="l:stack l:text md">
	{#each usages as { meta }}
		<a class="font:xxl" href={`/usage/${meta.slug}`}>{meta.title}</a>
	{/each}
</div>
