<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageMain} = ui.content
	const {Aside} = ui.drafts
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

	let header = $derived({
		title,
		main: headerMain,
		side: headerSide,
	})
</script>

{#snippet headerMain()}
	<h1>{title}</h1>
	{#if post.subtitle}
		<h2 class="h4">{post.subtitle}</h2>
	{/if}
	{#if description}<p>{description}</p>{/if}
{/snippet}

{#snippet headerSide()}
	<Aside
		created={post.date_created}
		updated={post.date_updated}
		series={seriesData}
		page={post.index}
	/>
{/snippet}

{#key post.id}
	<PageMain pageName="Blog" {title} {description} {header} size="sm">
		<article class="l:sidebar:sm">
			<div class="l:main maki:block:2xl">
				<EscapeHtml id={slug} {html} size="md" margin="auto" />
			</div>
			<div class="l:side"></div>
		</article>
	</PageMain>
{/key}
