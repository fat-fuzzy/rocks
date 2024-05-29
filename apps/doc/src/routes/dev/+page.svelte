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
	<div class="l:stack:xl card:xl">
		{#each markdowns as { meta }}
			<a class="font:xxl" href={`/dev/${meta.slug}`}>{meta.title}</a>
		{/each}
	</div>
</PageMain>
