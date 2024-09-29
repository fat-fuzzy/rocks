<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	const path = $derived($page.url.pathname)

	let markdown = $page.data.content
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let sketches = $state($page.data.sketches.experiments)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []))
</script>

<PageMain {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<div class="l:text:lg">
		<EscapeHtml {html} />
	</div>
	{#if tags.size > 0}
		<h2>Tags</h2>
		<div class="l:text l:grid:sm maki:block">
			{#each tags as tag}
				<details class="card:md l:stack size:sm bg:netural varian:bare" open>
					<summary class="surface:2:neutral card:2xs">{tag}</summary>
					<div class="l:stack:xs maki:block">
						<ul class="unstyled">
						{#each sketches as { slug, asset, title, tags, categories }}
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
	{/if}
</PageMain>
