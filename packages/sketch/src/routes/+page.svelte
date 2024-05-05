<script lang="ts">
	import {page} from '$app/stores'
	import {headless} from '@fat-fuzzy/ui-s5'

	const {Head} = headless
	const title = 'Play'
	const description = 'A sandbox environment to experiment and learn web-based computer graphics.'

	$: sketches = $page.data.sketches
	$: tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []))
	$: headerClass = 'l:switcher:sm bg:polar align:center'
</script>

<Head page={title} {description} />

<header class={headerClass}>
	<h1>Fat Fuzzy {title}</h1>
</header>

<div class="l:grid:2xs maki:block">
	{#each tags as tag}
		<article class="card:dotted bg:primary:000 l:stack size:sm">
			<h2 class="font:xxl">{tag}</h2>
			{#each sketches as { slug, title, tags }}
				{#if tags.includes(tag)}
					<a href={`/${slug}`}>
						{title}
					</a>
				{/if}
			{/each}
		</article>
	{/each}
</div>
