<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '@fat-fuzzy/ui'

	$: markdowns = $page.data.markdowns

	const {Head} = headless

	let title = 'Dev'
</script>

<Head page={title} description="Developer Doc" />

<header class="page-header card:xs bg:polar">
	<h1 class="card:lg">{`Fat Fuzzy  ${title}`}</h1>
</header>

<div class="l:stack:xl card:xl">
	{#each markdowns as { meta }}
		<a class="font:xxl" href={`/dev/${meta.slug}`}>{meta.title}</a>
	{/each}
</div>
