<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	let markdowns = $state($page.data.markdowns)

	const {PageMain} = content

	let title = ' Fat Fuzzy Dev'
	let description =
		'Fat Fuzzy Dev: how to use the packages in this project, examples, notes'
</script>

<PageMain {title} {description}>
	<article class="l:sidebar:xs">
		<section class="l:main card:md l:stack:lg">
			{#each markdowns as { meta }}
				<a class="font:lg" href={`/dev/${meta.slug}`}>{meta.title}</a>
			{/each}
		</section>
	</article>
</PageMain>
