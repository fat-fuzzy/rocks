<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import PageChlorophyll from './PageChlorophyll.svelte'

	const {PageRails} = ui.content

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let title = 'Chlorophyll'
	let description =
		'Edit, structure, compare and print a document from your browser'
</script>

<PageRails
	{title}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="tgv"
>
	{#snippet main()}
		<PageChlorophyll />
	{/snippet}
</PageRails>
