<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'
	import PageMycelium from './PageMycelium.svelte'

	const {PageRails} = ui.content

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let description =
		'Get a sense of where you are at and decide where you are going.'
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
		<PageMycelium />
	{/snippet}
</PageRails>
