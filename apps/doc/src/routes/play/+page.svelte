<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content
	const title = 'Play'
	const path = '/play'
	const description =
		'A sandbox environment to experiment and learn web-based computer graphics.'

	let sketches = $state($page.data.sketches)
	let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []))
</script>

<PageMain {title} {description} size="lg">
	{#snippet header()}
		<h1 class="w:full maki:block:md">Fat Fuzzy {title}</h1>
	{/snippet}
	<p>
		Sketches are exercises from <a
			href="https://webgl2fundamentals.org"
			target="_blank"
			rel="noopener"
		>
			WebGL Fundamentals 1 & 2
		</a>
	</p>
	<div class="l:grid:sm maki:block">
		{#each tags as tag}
			<article class="card:md l:stack size:sm surface:1:primary">
				<h3 class="surface:1:accent"><small class='maki:inline'>{tag}</small></h3>
				<details open>
					<summary class="surface:2:primary card:2xs"><small>Sketches</small></summary>
					<div class="l:stack:xs maki:block">
						{#each sketches as { slug, asset, title, tags }}
							{#if tags.includes(tag)}
								<a class={`font:md ${asset}`} href={`${path}/${slug}`}>
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
