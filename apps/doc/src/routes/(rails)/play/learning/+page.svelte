<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	const path = $derived($page.url.pathname)
	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let sketches = $derived($page.data.learning)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	let tags = $derived(
		new Set(
			sketches
				.reduce((acc, {tags}) => [...acc, ...tags], [])
				.filter((tag) => tag !== 'webgl' && tag !== 'webglfundamentals'),
		),
	)
</script>

<PageRails
	pageName="Learning"
	{title}
	{description}
	size="sm"
	path={$page.url.pathname}
	nav={$page.data.pageNav}
	layout="metro"
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="md" />
	{/snippet}
	{#snippet aside()}
		{#if tags.size > 0}
			<div class="tags l:grid:auto size:xs maki:block">
				{#each tags as tag}
					<details class="surface:1:neutral shape:soft" open>
						<summary
							class="color:neutral font:sm font:heading ravioli:3xs shape:soft"
						>
							{tag}
						</summary>
						<div class="ravioli:3xs shape:soft">
							<ul class="unstyled text:start">
								{#each sketches as { slug, asset, title, tags }}
									{#if tags.includes(tag)}
										<li class={`size:sm emoji:${asset}`}>
											<a class="font:sm" href={`${path}/${slug}`}>
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
	{/snippet}
</PageRails>
