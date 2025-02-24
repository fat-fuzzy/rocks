<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	let markdown = $derived(page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)

	// TODO: Use webgl & webglfundamentals tags to group sketches elsewhere
	// let tags = new Set(sketches.reduce((acc, {tags}) => [...acc, ...tags], []).filter((tag)=> tag !== 'webgl' && tag !== 'webglfundamentals'))
</script>

<PageMain {title} {description} size="md">
	<article class="l:sidebar:md">
		<div class="l:main">
			<EscapeHtml id={slug} {html} size="md" margin="auto" />
		</div>
		<div class="l:side"></div>
	</article>
</PageMain>
