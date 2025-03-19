<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content

	let markdowns = $state(page.data.markdowns.decisions)

	let title = 'Decision Log'
	let description = 'Log of Architectural decisions'
	let tags = new Set(
		markdowns.reduce((acc, {meta}) => [...acc, ...meta.tags], []),
	)
</script>

<PageRails
	{title}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	context={page.data.context}
	layout=""
>
	{#snippet main()}
		<div class="l:text:md maki:auto">
			<ul class="l:grid:sm unstyled">
				{#each markdowns as { meta }}
					{#if meta.status !== 'draft'}
						<a
							class="surface:2:neutral ravioli:sm"
							href={`${page.url.pathname}/${meta.slug}`}
						>
							{Number(meta.id)} - {meta.title}
						</a>
					{/if}
				{/each}
			</ul>
		</div>
	{/snippet}
	{#snippet aside()}
		<h2>Tags</h2>
		<div class="l:text l:grid:sm maki:block">
			{#each tags as tag}
				<details class="bg:netural variant:bare">
					<summary class="surface:2:neutral font:sm font:heading ravioli:3xs">
						{tag}
					</summary>
					<div class="ravioli:md">
						<ul class="unstyled">
							{#each markdowns as { meta }}
								{#if meta.tags.includes(tag)}
									<li class={`size:sm emoji:${meta.asset}`}>
										{#if meta.status !== 'draft'}
											<a
												class="font:sm"
												href={`${page.url.pathname}/${meta.slug}`}
											>
												{meta.title}
											</a>
										{/if}
									</li>
								{/if}
							{/each}
						</ul>
					</div>
				</details>
			{/each}
		</div>
	{/snippet}
</PageRails>
