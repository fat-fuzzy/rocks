<script lang="ts">
	import {page} from '$app/stores'

	import {headless} from '@fat-fuzzy/ui-s5'

	$: markdowns = $page.data.markdowns

	const {Head} = headless

	let title = 'Dev'
	$: headerClass = 'l:flex card:sm bg:polar align:center'
</script>

<Head page={title} description="Developer Doc" />

<header class={headerClass}>
	<h1 class="card:md">Fat Fuzzy {title}</h1>
</header>

<div class="l:stack:xl card:xl">
	{#each markdowns as { meta }}
		<a class="font:xxl" href={`/dev/${meta.slug}`}>{meta.title}</a>
	{/each}
</div>
