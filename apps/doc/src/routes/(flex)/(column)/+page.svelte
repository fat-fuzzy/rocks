<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageScrolly} = ui.drafts

	let sections = $state(page.data.sections)
	let markdown = $derived(page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
</script>

<PageScrolly
	{title}
	{description}
	size="md"
	justify="center"
	animations={['fade']}
	fixed={false}
	items={sections}
>
	{#snippet header()}
		<div class="w:full maki:block size:2xl">
			<h1 class="ravioli:md text:center maki:block size:xs">Fat Fuzzy Rocks</h1>
		</div>
	{/snippet}
</PageScrolly>
