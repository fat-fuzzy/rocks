<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	const path = $derived($page.url.pathname)

	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let sketches = $derived($page.data.projects)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	let tags = $derived(
		new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], [])),
	)
</script>

<PageRails
	pageName="Projects"
	{title}
	{description}
	size="sm"
	path={$page.url.pathname}
	nav={$page.data.nav}
	context={$page.data.context}
	layout=""
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="md" margin="auto" />
		<div class="l:text:md maki:auto">
			<ul class="unstyled">
				{#each sketches as { slug, asset, title }}
					<li class={`ravioli:3xs ${asset}`}>
						<a class="font:md" href={`${path}/${slug}`}>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/snippet}
	{#snippet aside()}
		{#if sketches.length > 5 && tags.size > 0}
			<p class="font:md font:heading maki:inline size:md">Tags</p>
			<div class="l:text l:grid:sm maki:block">
				{#each tags as tag}
					<details class="bg:netural variant:bare">
						<summary class="surface:2:neutral font:sm font:heading ravioli:3xs">
							{tag}
						</summary>
						<div class="maki:inline size:sm">
							<ul class="unstyled">
								{#each sketches as { slug, asset, title, tags }}
									{#if tags.includes(tag)}
										<li class={`ravioli:3xs ${asset}`}>
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
	{/snippet}
	{#snippet footer()}
		<Footer />
	{/snippet}
</PageRails>
