<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageMetro} = ui.content
	const {EscapeHtml} = ui.headless

	const path = $derived($page.url.pathname)

	let pageContext = $derived({...$page.data.pageContext, title: 'On this Page'})
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

<PageMetro
	pageName="Learning"
	{title}
	{description}
	size="sm"
	path={$page.url.pathname}
	nav={$page.data.pageNav}
	context={pageContext}
	layout=""
>
	{#snippet main()}
		<EscapeHtml id={slug} {html} size="md" margin="auto" />
	{/snippet}
	{#snippet aside()}
		{#if tags.size > 0}
			<p class="font:md font:heading font:semibold cannelloni:inline size:2xs">
				Tags
			</p>
			<div class="l:text l:grid:sm maki:block">
				{#each tags as tag}
					<details class="bg:netural">
						<summary class="color:primary font:sm font:heading ravioli:3xs">
							{tag}
						</summary>
						<div class="maki:inline size:sm">
							<ul class="unstyled">
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
	{#snippet footer()}
		<Footer />
	{/snippet}
</PageMetro>
