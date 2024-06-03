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
	<div class="l:text maki:block:2xs">
		<ul class="l:stack:lg unstyled">
			{#each markdowns as { meta }}
				<a class="font:lg bg:primary:000 card:md" href={`/dev/${meta.slug}`}>
					{meta.title}
				</a>
			{/each}
		</ul>
	</div>
</PageMain>
