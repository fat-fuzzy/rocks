<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import playbook from '@fat-fuzzy/playbook'
	import Footer from '$lib/ui/Footer.svelte'

	const {PlaybookCollection} = playbook

	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless
	let title = 'Fat Fuzzy UI'
	let description = `${title} | Doc`

	const categories = ['tokens', 'blocks', 'layouts', 'recipes']

	let content = $derived(page.data.content)
	let markdowns = $derived(page.data.markdowns)
	let slug = $derived(content.meta.slug)
</script>

<PageRails
	pageName="UI"
	{title}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	size="sm"
	context={page.data.context}
	layout=""
>
	{#snippet main()}
		<EscapeHtml
			id={slug}
			html={content.html}
			size="md"
			margin="auto"
			element="section"
		/>

		<div class="l:text:md maki:auto">
			{#each categories as category}
				<PlaybookCollection
					{category}
					{markdowns}
					path={page.url.pathname}
					depth={1}
					isPage={false}
					formaction="updateState"
					{content}
				>
					<EscapeHtml
						id={`${slug}-${category}`}
						html={markdowns.categories.find(({meta}) => meta.slug === category)
							.html}
						size="md"
					/>
				</PlaybookCollection>
			{/each}
		</div>
	{/snippet}

	{#snippet aside()}
		<p class="feedback">Some Context</p>
	{/snippet}

	{#snippet footer()}
		<Footer />
	{/snippet}
</PageRails>
