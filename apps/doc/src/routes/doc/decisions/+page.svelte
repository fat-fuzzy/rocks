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
	<div class="l:grid:sm maki:block">
		{#each tags as tag}
			<details class="card:md l:stack size:sm bg:netural varian:bare" open>
				<summary class="surface:2:neutral card:2xs">{tag}</summary>
				<div class="l:stack:xs maki:block">
					<ul role="group">
						{#each markdowns as { meta }}
							{#if meta.tags.includes(tag)}
								<li class={`card:3xs`}>
									{#if meta.status !== 'draft'}
										<a href={`${$page.url.pathname}/${meta.slug}`}>
											{Number(meta.id)} - {meta.title}
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
