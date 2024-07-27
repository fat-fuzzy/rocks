<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui'

	const {PageMain} = content
	const title = 'Fat Fuzzy Play'
	const description =
		'A sandbox environment to experiment and learn web-based computer graphics.'

	const path = $derived($page.url.pathname)
	let sketches = $page.data.sketches
	let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []))
</script>

<PageMain {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<div class="l:grid:sm maki:block">
		{#each tags as tag}
			<details class="card:md l:stack size:sm bg:netural varian:bare" open>
				<summary class="surface:2:neutral card:2xs">{tag}</summary>
				<div class="l:stack:xs maki:block">
					<ul class="unstyled">
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
