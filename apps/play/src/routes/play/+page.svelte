<script lang="ts">
	import {page} from '$app/stores'
	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const title = 'Play'
	const description =
		'A sandbox environment to experiment and learn web-based computer graphics.'

	$: sketches = $page.data.sketches
	$: headerClass = 'l:flex card:sm bg:polar align:center'
</script>

<Head page={title} {description} />

<header class={headerClass}>
	<h1 class="card:md">Fat Fuzzy {title}</h1>
</header>

<div class="l:stack:xl card:lg">
	{#each sketches as sketch}
		<a class="font:xxl" href={`/play/${sketch.slug}`}>{sketch.title}</a>
	{/each}
</div>
