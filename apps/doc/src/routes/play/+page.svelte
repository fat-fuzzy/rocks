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
		<details class="card:md l:stack size:sm bg:netural varian:bare" open>
			<summary class="surface:2:neutral card:2xs">{tag}</summary>
			<div class="l:stack:xs maki:block">
				<ul role="group">
				{#each sketches as { slug, asset, title, tags }}
					{#if tags.includes(tag)}
						<li class={`card:3xs ${asset}`}>
							<a class="font:md" href={`${path}/${slug}`}>
								{title}
							</a>
						</li>
					{/if}
				{/each}
			</ul>
			</div>
		</details>
		{/each}
	</div>
</PageMain>
