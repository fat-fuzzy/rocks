<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
	let slide = $derived(page.data.content)
	let notes = $derived(page.data.notes)
	let title = $derived(slide.meta.title)
	let description = $derived(slide.meta.description)
	let html = $derived(slide.html)
	let slug = $derived(slide.slug)

	$effect(() => {
		if (slide) {
			html = slide.html
		}
	})
</script>

<PageRails
	pageName={title}
	{title}
	{description}
	size="sm"
	path={page.url.pathname}
	nav={page.data.nav}
	app={appContext}
	layout="steam"
>
	{#snippet main()}
		{#key html}
			<EscapeHtml id={slug} {html} size="xl" />
		{/key}
	{/snippet}

	{#snippet aside()}
		{#if notes}
			{#key notes.html}
				<details open>
					<summary class="font:sm">Notes</summary>
					<EscapeHtml id={`${slug}-notes`} html={notes.html} font="sm" />
				</details>
			{/key}
		{/if}
	{/snippet}
</PageRails>
