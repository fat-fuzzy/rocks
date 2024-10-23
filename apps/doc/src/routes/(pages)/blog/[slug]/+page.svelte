<script lang="ts">
	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
	const {EscapeHtml} = ui.headless

	let post = $derived($page.data)
	let title = $derived(post.title)
	let description = $derived(post.description)
	let html = $derived(post.html)
	let slug = $derived(post.slug)
	let series = $derived(
		post.series
			? post.series.items.map((id) =>
					$page.data.markdowns.find((post) => post.meta.id === id),
				)
			: null,
	)
	let seriesData = $derived(
		series
			? series.map((post) => ({
					link: slug,
					title: post.meta.subtitle,
				}))
			: undefined,
	)
</script>

{#key post.id}
	<PageMain pageName="Blog" {title} {description}>
		{#snippet header()}
			<div class="l:main:50 maki:block:md l:stack:lg">
				<h1>{title}</h1>
				{#if post.subtitle}<p class="h4">
						{post.index
							? `Part ${post.index}: ${post.subtitle}`
							: post.subtitle}
					</p>{/if}
				{#if description}<p>{description}</p>{/if}
			</div>
			<div class="l:side">
				<Aside
					created={post.date_created}
					updated={post.date_updated}
					series={seriesData}
					page={post.index}
				/>
			</div>
		{/snippet}
		<article class="l:sidebar:md">
			<EscapeHtml id={slug} {html} size="lg" />
		</article>
	</PageMain>
{/key}
