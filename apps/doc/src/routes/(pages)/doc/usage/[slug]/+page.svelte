<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
	const {EscapeHtml} = ui.headless

	let markdown = $derived(
		$page.data.markdowns.usages.find((d) => d.path === $page.data.path),
	)
	let title = $derived(markdown.meta.title)
	let description = $derived(`Developer Doc ${markdown.meta.id}: ${title}`)
	// let updated = $derived(markdown.meta.date_created) TODO
	let html = $derived($page.data.html)
</script>

{#key title}
<PageMain pageName="Usage" {title} {description}>
	{#snippet header()}
		<h1 class="l:main:50 hug maki:block:md">{title}</h1>
		<Aside created={markdown.meta.date_created} updated={markdown.meta.date_updated}/>
	{/snippet}
	<article class="l:sidebar:md">
		<div class="l:text:lg">
			<EscapeHtml {html} />
		</div>
	</article>
</PageMain>
{/key}
