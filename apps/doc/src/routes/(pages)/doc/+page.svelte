<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let images = $state(page.data.images)
	let brightness = $state(page.data.settings.brightness || '')
	let markdown = $state(page.data.content)
	let title = $state(markdown.meta.title)
	let description = $state(markdown.meta.description)
	let html = $state(markdown.html)
	let slug = $state(markdown.meta.slug)
	let media = $derived(brightness ? images[brightness] : images['day'])
</script>

<PageMain {title} {description} size="md">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<article class="l:sidebar:2xl media">
		<div class="l:side">
			<EscapeHtml id={slug} {html} />
		</div>
		<div class="l:main:50">
			<div class="l:taco">
				<Picture {...media} dimensions="full" />
			</div>
		</div>
	</article>
</PageMain>
