<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless

	let post = $derived(page.data.content)
	let title = $derived(post.meta.title)
	let description = $derived(post.meta.description)
	let html = $derived(post.html)
	let slug = $derived(post.meta.slug)
</script>

<PageMain {title} {description}>
	<article class="l:sidebar:md">
		<div class="l:main">
			<EscapeHtml id={slug} {html} size="md" margin="auto" />
		</div>
		<div class="l:side"></div>
	</article>
</PageMain>
