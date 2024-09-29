<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	let markdown = $page.data.content
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	// let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []).filter((tag)=> tag !== 'webgl' && tag !== 'webglfundamentals'))
</script>

<PageMain {title} {description} size="lg">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<div class="l:text:lg">
		<EscapeHtml {html} />
	</div>
</PageMain>
