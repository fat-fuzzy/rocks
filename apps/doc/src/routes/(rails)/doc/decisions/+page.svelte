<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content

	let appContext = $derived(page.data.appContext)
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
	app={appContext}
	layout="tram"
>
	{#snippet main()}
		<div class="l:text:md">
			<ul class="l:grid:auto size:sm">
				{#each markdowns as { meta }, i (i)}
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
		<p class="font:md font:heading font:semibold cannelloni:inline size:2xs">
			Tags
		</p>
		<div class="l:grid:auto size:xs maki:block">
			{#each tags as tag}
				<details class="surface:1:neutral shape:soft" open>
					<summary
						class="color:neutral font:sm font:heading ravioli:3xs shape:soft"
					>
						{tag}
					</summary>
					<div class="ravioli:lg shape:soft">
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
