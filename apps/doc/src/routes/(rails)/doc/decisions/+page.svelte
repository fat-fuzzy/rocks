<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content

	let markdowns = $state(page.data.markdowns.decisions)

	let title = 'Decision Log'
	let description = 'Log of Architectural decisions'
	let tags = new Set(
		markdowns.reduce((acc, {meta}) => [...acc, ...meta.tags], []),
	)

	let header = $derived({
		title,
		media: true,
		main: headerMain,
	})
</script>

{#snippet headerMain()}
	<h1>{title}</h1>
{/snippet}

<PageMain {title} {description} {header} size="lg">
	<article class="l:sidebar:md">
		<div class="l:main">
			<div class="maki:block:2xs">
				<ul class="l:grid:md w:full unstyled">
					{#each markdowns as { meta }}
						{#if meta.status !== 'draft'}
							<a
								class="font:lg surface:2:neutral ravioli:md"
								href={`${page.url.pathname}/${meta.slug}`}
							>
								{Number(meta.id)} - {meta.title}
							</a>
						{/if}
					{/each}
				</ul>
			</div>
			<h2>Tags</h2>
			<div class="l:grid:sm maki:block">
				{#each tags as tag}
					<details
						class="ravioli:md l:stack size:sm bg:netural varian:bare"
						open
					>
						<summary class="surface:2:neutral ravioli:2xs">{tag}</summary>
						<div class="l:stack:xs maki:block">
							<ul class="unstyled">
								{#each markdowns as { meta }}
									{#if meta.tags.includes(tag)}
										<li class={`ravioli:3xs`}>
											{#if meta.status !== 'draft'}
												<a href={`${page.url.pathname}/${meta.slug}`}>
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
		</div>
		<div class="l:side"></div>
	</article>
</PageMain>
