<script lang="ts">
	import {page} from '$app/stores'
	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const title = 'Play'
	const description = 'A sandbox environment to experiment and learn web-based computer graphics.'

	$: sketches = $page.data.sketches
	$: headerClass = 'l:switcher:sm bg:polar align:center'
</script>

<Head page={title} {description} />

<header class={headerClass}>
	<h1>Fat Fuzzy {title}</h1>
</header>

<div class="l:stack:md">
	{#each sketches as sketch}
		<a class="font:xxl" href={`${sketch.slug}`}>{sketch.title}</a>
	{/each}
</div>
