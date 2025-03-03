<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	const path = $derived(page.url.pathname)

	let markdown = $derived(page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let sketches = $derived(page.data.projects)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	let tags = $derived(
		new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], [])),
	)
</script>

<PageMain {title} {description} size="sm">
	<article class="l:sidebar:sm">
		<div class="l:main">
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
				{#if sketches.length > 5 && tags.size > 0}
					<h2>Tags</h2>
					<div class="l:text l:grid:sm maki:block">
						{#each tags as tag}
							<details
								class="ravioli:md l:stack size:sm bg:netural varian:bare"
							>
								<summary class="surface:2:neutral ravioli:2xs">{tag}</summary>
								<div class="l:stack:xs maki:block">
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
			</div>
		</div>
		<div class="l:side"></div>
	</article>
</PageMain>
