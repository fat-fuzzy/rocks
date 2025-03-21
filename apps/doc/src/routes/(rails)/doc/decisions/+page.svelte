<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

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
		<p
			class="font:md font:heading font:semibold size:sm ravioli:3xs surface:1:neutral variant:bare"
		>
			Tags
		</p>
		<div class="l:text l:grid:sm maki:block">
			{#each tags as tag}
				<details class="bg:netural">
					<summary
						class="color:primary variant:bare font:sm font:heading ravioli:3xs"
					>
						{tag}
					</summary>
					<div class="maki:inline size:sm">
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
	{#snippet footer()}
		<Footer />
	{/snippet}
</PageRails>
