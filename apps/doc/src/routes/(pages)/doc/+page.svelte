<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let images = $derived(page.data.images)
	let brightness = $derived(page.data.settings.brightness)
	let markdown = $derived(page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let media = $derived(brightness ? images[brightness] : images['day'])

	let header = $derived({
		title,
		media: true,
		main: headerMain,
	})
</script>

{#snippet headerMain()}
	<h1>{title}</h1>
{/snippet}

<PageMain {title} {description} {header} size="md">
	<article class="l:sidebar:2xl media">
		<div class="l:side">
			<EscapeHtml id={slug} {html} layout="media" />
		</div>
		<div class="l:main:50">
			<div class="l:taco">
				<Picture {...media} dimensions="full" />
			</div>
		</div>
	</article>
</PageMain>
