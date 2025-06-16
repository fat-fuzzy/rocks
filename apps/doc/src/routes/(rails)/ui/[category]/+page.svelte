<script lang="ts">
	import {page} from '$app/state'
	import playbook from '@fat-fuzzy/playbook'

	const {PlaybookCollection} = playbook

	let formaction = 'updateState'

	let path = $derived(page.url.pathname)
	let hash = $derived(page.url.hash)
	let category = $derived(page.params.category)
	let content = $derived(page.data.content)
	let appContext = $derived(page.data.appContext)
	let pageContext = $derived(page.data.pageContext)
</script>

{#key path}
	<!-- This key is used to re-render the component when the path changes -->
	<PlaybookCollection
		{category}
		path={`${path}${hash}`}
		depth={1}
		isPage={true}
		{formaction}
		{content}
		context={{app: appContext, page: pageContext}}
	/>
{/key}
