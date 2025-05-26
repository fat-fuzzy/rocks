<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content

	let appContext = $derived(page.data.appContext)
	let markdowns = $state(page.data.markdowns.usages)
	let title = 'Usage'
	let description =
		'Fat Fuzzy Doc: how to use the packages in this project, examples, notes'
</script>

<PageRails
	{title}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	app={appContext}
	layout={page.data.sidebar.layout}
>
	{#snippet main()}
		<div class="l:text:md">
			<ul class="l:grid:auto size:xs unstyled">
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
</PageRails>
