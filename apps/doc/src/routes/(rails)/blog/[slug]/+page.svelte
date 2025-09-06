<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails, PageContext} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
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
		app={appContext}
		layout="metro"
	>
		{#snippet main()}
			<p
				class="feedback:prose status:default bg:default:100 size:md variant:bare maki:block l:text:md"
			>
				<span class="font:sm">{description}</span>
			</p>
			<EscapeHtml id={slug} {html} size="md" />
		{/snippet}
		{#snippet aside()}
			<PageContext
				created={post.date_created}
				updated={post.date_updated}
				series={seriesData}
				page={post.index}
			/>
		{/snippet}
	</PageRails>
{/key}
