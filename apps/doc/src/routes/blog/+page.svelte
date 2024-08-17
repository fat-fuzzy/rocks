<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	let markdown = $page.data.content
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
</script>

<PageMain {title} {description} size="md">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<article class="l:sidebar:md">
		<div class="l:text:lg">
			<EscapeHtml {html}/>
		</div>
	</article>
</PageMain>
