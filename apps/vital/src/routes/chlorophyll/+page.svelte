<script lang="ts">
	import {page} from '$app/state'
	import ui from '@fat-fuzzy/ui'

	import {DOC_LANGUAGE} from '$config/setup'
	import PageChlorophyll from './PageChlorophyll.svelte'

	import {getPrefixForRoute} from '$lib/common/routing'

	const {PageRails} = ui.content

	let pageContext = $derived({...page.data.pageContext, label: 'On this Page'})
	let description =
		'Edit, structure, compare and print a document from your browser'

	let language = $derived(DOC_LANGUAGE)
	let title = $derived('Chlorophyll')
	let prefix = $derived(`${getPrefixForRoute(language)} ${title}`)
</script>

<PageRails
	title=""
	{prefix}
	{description}
	path={page.url.pathname}
	nav={page.data.nav}
	context={pageContext}
	layout="railway"
>
	{#snippet main()}
		<PageChlorophyll />
	{/snippet}
</PageRails>
