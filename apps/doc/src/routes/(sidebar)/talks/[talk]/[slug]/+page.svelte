<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails, PageContext} = ui.content
	const {EscapeHtml} = ui.headless

	let appContext = $derived(page.data.appContext)
	let slide = $derived(page.data.content)
	let title = $derived(slide.title)
	let description = $derived(slide.description)
	let html = $derived(slide.html)
	let slug = $derived(slide.slug)
	let series = $derived(
		slide.series
			? slide.series.items.map((id) =>
					page.data.markdowns.find((slide) => slide.meta.id === id),
				)
			: null,
	)
	let seriesData = $derived(
		series
			? series.map((slide) => ({
					link: slide.meta.slug,
					title: slide.meta.subtitle,
				}))
			: undefined,
	)
</script>

{#key slide.id}
	<PageRails
		pageName={title}
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
				class="feedback:prose status:default bg:default:100 size:md variant:bare maki:block l:text:xl"
			>
				<span class="font:sm">{description}</span>
			</p>
			<EscapeHtml id={slug} {html} size="xl" />
		{/snippet}
		{#snippet aside()}
			<PageContext
				created={slide.date_created}
				updated={slide.date_updated}
				series={seriesData}
				page={slide.index}
			/>
		{/snippet}
	</PageRails>
{/key}
