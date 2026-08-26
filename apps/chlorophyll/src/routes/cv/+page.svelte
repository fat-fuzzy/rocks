<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import PageCV from '$lib/ui/PageCV.svelte'

	const {PageRails} = ui.content

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let title = 'CV'
	let description = 'Edit, structure, compare and print a CV from your browser'
</script>

<PageRails
	{title}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="voyager"
>
	{#snippet main()}
		<PageCV />
	{/snippet}
</PageRails>
