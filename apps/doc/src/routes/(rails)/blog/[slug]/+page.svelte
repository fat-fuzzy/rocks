<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'

	const {PageRails, Aside} = ui.content
	const {EscapeHtml} = ui.headless

	let post = $derived(page.data.content)
	let title = $derived(post.title)
	let description = $derived(post.description)
	let html = $derived(post.html)
	let slug = $derived(post.slug)
	let series = $derived(
		post.series
			? post.series.items.map((id) =>
					page.data.markdowns.find((post) => post.meta.id === id),
				)
			: null,
	)
	let seriesData = $derived(
		series
			? series.map((post) => ({
					link: post.meta.slug,
					title: post.meta.subtitle,
				}))
			: undefined,
	)
</script>

{#key post.id}
	<PageRails
		pageName="Blog"
		{title}
		{description}
		size="sm"
		path={page.url.pathname}
		nav={page.data.nav}
		context={page.data.context}
		layout=""
	>
		{#snippet main()}
			<EscapeHtml id={slug} {html} size="md" margin="auto" />
			<div class="l:text:md maki:auto">
				<Footer />
			</div>
		{/snippet}
		{#snippet aside()}
			<Aside
				created={post.date_created}
				updated={post.date_updated}
				series={seriesData}
				page={post.index}
			/>
		{/snippet}
	</PageRails>
{/key}
