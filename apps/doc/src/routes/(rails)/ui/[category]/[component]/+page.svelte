<script lang="ts">
	import {page} from '$app/state'
	import playbook from '@fat-fuzzy/playbook'

	const {PlaybookElement} = playbook

	let formaction = 'updateState'

	let path = $derived(page.url.pathname)
	let category = $derived(page.params.category)
	let title = $derived(page.params.component)
	let content = $derived(page.data.content)
	let appContext = $derived(page.data.appContext)
	let pageContext = $derived(page.data.pageContext)
</script>

{#key title}
	<PlaybookElement
		{title}
		{category}
		{content}
		{path}
		{formaction}
		context={{app: appContext, page: pageContext}}
	/>
{/key}
