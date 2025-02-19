<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
	const {EscapeHtml} = ui.headless

	let markdown = $derived(
		page.data.markdowns.decisions.find((d) => d.path === page.data.html.path),
	)
	let title = $derived(markdown.meta.title)
	let description = $derived(`Decision Log ${markdown.meta.id}: ${title}`)
	let html = $derived(markdown.html)
	let slug = $derived(markdown.meta.slug)

	let header = $derived({
		title,
		main: headerMain,
		side: headerSide,
	})
</script>

{#snippet headerMain()}
	<h1>{title}</h1>
{/snippet}
{#snippet headerSide()}
	<Aside
		created={markdown.meta.date_created}
		updated={markdown.meta.date_updated}
	/>
{/snippet}

{#key title}
	<PageMain pageName="Decisions" {title} {description} {header}>
		<article class="l:sidebar:md">
			<div class="l:main">
				<EscapeHtml id={slug} {html} size="md" margin="auto" />
			</div>
			<div class="l:side"></div>
		</article>
	</PageMain>
{/key}
