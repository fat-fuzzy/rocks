<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
	const {EscapeHtml} = ui.headless

	let markdown = $derived(
		page.data.markdowns.usages.find((d) => d.path === page.data.html.path),
	)
	let title = $derived(markdown.meta.title)
	let description = $derived(`Developer Doc ${markdown.meta.id}: ${title}`)
	// let updated = $derived(markdown.meta.date_created) TODO
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)
</script>

{#key title}
	<PageMain pageName="Usage" {title} {description}>
		{#snippet header()}
			<h1 class="l:main:50 hug maki:block:md">{title}</h1>
			<Aside
				created={markdown.meta.date_created}
				updated={markdown.meta.date_updated}
			/>
		{/snippet}
		<article class="l:sidebar:md">
			<div class="l:main">
				<EscapeHtml id={slug} {html} size="md" />
			</div>
		</article>
	</PageMain>
{/key}
