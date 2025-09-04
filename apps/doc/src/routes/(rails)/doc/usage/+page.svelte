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
	layout="tram"
>
	{#snippet main()}
		<ul class="l:grid:auto size:sm unstyled">
			{#each markdowns as { meta }, i (i)}
				{#if meta.status !== 'draft'}
					<li class="surface:2:neutral ravioli:3xs l:stack shape:mellow">
						<a
							class="raviolink w:full"
							href={`${page.url.pathname}/${meta.slug}`}
						>
							{Number(meta.id)} - {meta.title}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	{/snippet}
</PageRails>
