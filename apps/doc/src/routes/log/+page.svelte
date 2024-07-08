<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdowns = $state($page.data.markdowns)

	let title = 'Fat Fuzzy Log'
	let description = 'Log of Architectural decisions'
</script>

<PageMain {title} {description}>
	<div class="l:text maki:block:2xs">
		<ul class="l:stack:lg unstyled">
			{#each markdowns as { meta }}
				<a class="font:lg surface:3:primary card:md" href={`/log/${meta.slug}`}>
					{meta.title}
				</a>
			{/each}
		</ul>
	</div>
</PageMain>
