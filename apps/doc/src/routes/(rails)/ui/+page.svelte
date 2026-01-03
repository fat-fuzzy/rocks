<script lang="ts">
	import type {Markdown} from '$types'
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import playbook from '@fat-fuzzy/playbook'

	const {PlaybookCollection} = playbook

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless
	let title = 'Fat Fuzzy UI'
	let description = `${title} | Doc`

	const categories = ['tokens', 'blocks', 'layouts', 'recipes']

	let content = $derived(page.data.content)
	let markdowns = $derived(page.data.markdowns)
	let slug = $derived(content.meta.slug)
	let appContext = $derived(page.data.appContext)
	let pageContext = $derived({...page.data.pageContext, title: 'On this Page'})
</script>

<PageRails
	{title}
	{description}
	size="md"
	path={page.url.pathname}
	nav={page.data.nav}
	app={pageContext}
	layout="voyager"
>
	{#snippet main()}
		<EscapeHtml id={slug} html={content.html} size="xl" />

		<div>
			{#each categories as category}
				<PlaybookCollection
					{category}
					path={page.url.pathname}
					depth={1}
					isPage={false}
					formaction="updateState"
					{content}
					context={{app: appContext, page: pageContext}}
				>
					<EscapeHtml
						id={`${slug}-${category}`}
						html={markdowns.categories.find(
							({meta}: Markdown) => meta.slug === category,
						).html}
						size="xl"
					/>
				</PlaybookCollection>
			{/each}
		</div>
	{/snippet}
</PageRails>
