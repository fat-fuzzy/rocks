<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	const {PageRails} = ui.content
	const {Scrolly} = ui.drafts

	let sections = $state(page.data.sections)
	let markdown = $derived(page.data.content)
	let title = $derived(markdown.meta.title)
	let description = $derived(markdown.meta.description)
	let appContext = $derived(page.data.appContext)
</script>

<PageRails
	{title}
	{description}
	size="md"
	path={page.url.pathname}
	nav={page.data.nav}
	app={appContext}
	layout="tgv"
>
	{#snippet main()}
		<Scrolly
			{title}
			animations={['fade']}
			items={sections}
			level={1}
			snap="center"
			magic={{spell: 'fuzzy', shape: 'round'}}
		/>
	{/snippet}
</PageRails>
