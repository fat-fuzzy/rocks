<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdowns = $state($page.data.markdowns.usages)
	let title = 'Fat Fuzzy Usage'
	let description =
		'Fat Fuzzy Doc: how to use the packages in this project, examples, notes'
</script>

<PageMain {title} {description} size="lg">
	<div class="maki:block:2xs">
		<ul class="l:stack:lg w:full" role="group">
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
</PageMain>
