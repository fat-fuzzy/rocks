<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import PagePhloem from './PagePhloem.svelte'

	const {PageRails} = ui.content

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let description =
		'Edit, structure, compare and print a document from your browser'
</script>

<PageRails
	title=""
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="railway"
>
	{#snippet main()}
		<PagePhloem />
	{/snippet}
</PageRails>
