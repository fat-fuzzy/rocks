<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdowns = $state($page.data.markdowns)

	let title = 'Fat Fuzzy Log'
	let description = 'Log of Architectural decisions'
</script>

<PageMain {title} {description}>
	<div class="l:sidebar:xs">
		<section class="l:main card:md l:stack:lg">
			{#each markdowns as { meta }}
				<a class="font:lg" href={`/log/${meta.slug}`}>{meta.title}</a>
			{/each}
		</section>
	</div>
</PageMain>
