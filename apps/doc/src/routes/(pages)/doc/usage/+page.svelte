<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content

	let markdowns = $state(page.data.markdowns.usages)
	let title = 'Usage'
	let description =
		'Fat Fuzzy Doc: how to use the packages in this project, examples, notes'
</script>

<PageMain {title} {description} size="lg" pageName="Doc">
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
		</div>
		<div class="l:side"></div>
	</article>
</PageMain>
