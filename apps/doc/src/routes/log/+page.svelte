<script lang="ts">
	import {page} from '$app/stores'
	import {content} from '@fat-fuzzy/ui-s5'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {PageMain} = content

	let markdowns = $state($page.data.markdowns)
	let appSettings = $derived(fatFuzzyStore.app)

	let title = 'Fat Fuzzy Log'
	let description = 'Log of Architectural decisions'
</script>

<PageMain {title} {description} app={{settings: appSettings}}>
	<div class="l:text maki:block:2xs">
		<ul class="l:stack:lg unstyled">
			{#each markdowns as { meta }}
				<a class="font:lg bg:primary:000 card:md" href={`/log/${meta.slug}`}>
					{meta.title}
				</a>
			{/each}
		</ul>
	</div>
</PageMain>
