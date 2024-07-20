<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'

	const {PageMain} = content

	let markdowns = $state($page.data.markdowns.log)

	let title = 'Decision Log'
	let description = 'Log of Architectural decisions'
</script>

<PageMain {title} {description} size="lg">
	<div class="l:text maki:block:2xs">
		<ul class="l:stack:lg unstyled">
			{#each markdowns as { meta }}
				{#if meta.status !== 'draft'}
					<a
						class="font:lg surface:3:primary card:md"
						href={`/doc/log/${meta.slug}`}
					>
						{meta.title}
					</a>
				{/if}
			{/each}
		</ul>
	</div>
</PageMain>
