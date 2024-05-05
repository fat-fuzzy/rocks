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
	<h1 class="w:full">Fat Fuzzy {title}</h1>
	<h2><small>Tags</small></h2>
</header>
<p>
	All sketches so far are exercises from <a
		href="https://webgl2fundamentals.org"
		target="_blank"
		rel="noopener"
	>
		WebGL Fundamentals 1 & 2
	</a>
</p>
<div class="l:grid:2xs maki:block">
	{#each tags as tag}
		<article class="card:md bg:accent:000 l:stack size:sm">
			<h3 class="tag bg:primary:000 card:sm"><small>{tag}</small></h3>
			<div class="size:xl l:stack">
				{#each sketches as { slug, asset, title, tags }}
					{#if tags.includes(tag)}
						<a class={`font:md ${asset}`} href={`/${slug}`}>
							{title}
						</a>
					{/if}
				{/each}
			</div>
		</article>
	{/each}
</div>
