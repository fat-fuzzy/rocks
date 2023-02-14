<script lang="ts">
	import {page} from '$app/stores'

	$: logs = $page.data.logs

	let title = 'Fat Fuzzy Log'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>Fat Fuzzy Log</h1>
</header>

<div class="l:stack l:text md">
	{#each logs as { meta }}
		<a class="font:xxl" href={`/log/${meta.slug}`}>{meta.title}</a>
	{/each}
</div>
