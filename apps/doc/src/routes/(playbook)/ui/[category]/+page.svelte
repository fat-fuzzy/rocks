<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import playbook from '@fat-fuzzy/playbook'
	import Footer from '$lib/ui/Footer.svelte'

	const {PlaybookCollection, PropsDemo, PropsDoc} = playbook
	const {PageRails} = ui.content
	const {EscapeHtml} = ui.headless

	let formaction = 'updateState'
	let title = 'Fat Fuzzy UI'
	let description = `${title} | Doc`

	let path = $derived(page.url.pathname)
	let category = $derived(page.params.category)
	let markdowns = $derived(page.data.markdowns)
	let content = $derived(page.data.content)
	let slug = $derived(content.meta.slug)
</script>

<PageRails
	{title}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	size="sm"
>
	{#snippet main()}
		<EscapeHtml
			id={slug}
			html={content.html}
			size="md"
			margin="auto"
			element="section"
		/>
		{#key category}
			<PlaybookCollection
				{category}
				{markdowns}
				path={`${path}${page.url.hash}`}
				depth={1}
				isPage={true}
				{formaction}
				{content}
			/>
		{/key}
	{/snippet}
	{#snippet aside()}
		<div class="l:stack:md">
			{#key category}
				<PropsDoc meta={content.meta} />
				<PropsDemo {path} meta={content.meta} categories={[category]} />
			{/key}
		</div>
	{/snippet}
	{#snippet footer()}
		<Footer />
	{/snippet}
</PageRails>
