<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content
	const title = 'Play'
	const description =
		'A sandbox environment to experiment and learn web-based computer graphics.'

	let sketches = $page.data.sketches
	let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []))
</script>

<PageMain {title} {description}>
	{#snippet header()}
		<h1 class="w:full">Fat Fuzzy {title}</h1>
		<h2><small>Tags</small></h2>
	{/snippet}
	<p>
		All sketches so far are exercises from <a
			href="https://webgl2fundamentals.org"
			target="_blank"
			rel="noopener"
		>
			WebGL Fundamentals 1 & 2
		</a>
	</p>
	<div class="l:grid:md maki:block">
		{#each tags as tag}
			<article class="card:md bg:primary:000 l:stack size:sm">
				<h3 class="bg:primary:100 card:sm"><small>{tag}</small></h3>
				<details open>
					<summary class="card:2xs"><small>Sketches</small></summary>
					<div class="l:stack:xs maki:block">
						{#each sketches as { slug, asset, title, tags }}
							{#if tags.includes(tag)}
								<a class={`font:md ${asset}`} href={`/${slug}`}>
									{title}
								</a>
							{/if}
						{/each}
					</div>
				</details>
			</article>
		{/each}
	</div>
</PageMain>
