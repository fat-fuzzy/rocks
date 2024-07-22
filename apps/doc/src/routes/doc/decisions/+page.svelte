<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdowns = $state($page.data.markdowns.decisions)

	let title = 'Decision Log'
	let description = 'Log of Architectural decisions'
	let tags = new Set(
		markdowns.reduce((acc, {meta}) => [...acc, ...meta.tags], []),
	)
</script>

<PageMain {title} {description} size="lg">
	<div class="l:text maki:block:2xs">
		<ul class="l:stack:lg w:full unstyled">
			{#each markdowns as { meta }}
				{#if meta.status !== 'draft'}
					<a
						class="font:lg surface:2:neutral card:md"
						href={`${$page.url.pathname}/${meta.slug}`}
					>
						{Number(meta.id)} - {meta.title}
					</a>
				{/if}
			{/each}
		</ul>
	</div>
	<h2>Tags</h2>
	<div class="l:text l:grid:sm maki:block">
		{#each tags as tag}
			<details class="card:md l:stack size:sm bg:netural varian:bare" open>
				<summary class="surface:2:neutral card:2xs">{tag}</summary>
				<div class="l:stack:xs maki:block">
					<ul class="unstyled">
						{#each markdowns as { meta }}
							{#if meta.tags.includes(tag)}
								<li class={`card:3xs`}>
									{#if meta.status !== 'draft'}
										<a href={`${$page.url.pathname}/${meta.slug}`}>
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
</PageMain>
