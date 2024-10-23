<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {PageMain} = ui.content
	const {EscapeHtml} = ui.headless
	const {Picture} = ui.drafts

	let images = $derived($page.data.images)

	let app = fatFuzzyStore.app

	let brightness = $derived(app.settings?.brightness || '')
	let markdown = $derived($page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
	let media = $derived(brightness ? images[brightness] : images['day'])
</script>

<PageMain {title} {description} size="md">
	{#snippet header()}
		<h1 class="l:side hug maki:block:md">{title}</h1>
	{/snippet}
	<article class="l:sidebar:2xl">
		<div class="l:side">
			<EscapeHtml id={slug} {html} />
		</div>
		<div class="l:main:50">
			<div class="l:center">
				<Picture {...media} dimensions="full" />
			</div>
		</div>
	</article>
</PageMain>
