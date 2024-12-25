<script lang="ts">
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'

	const {PlaybookCollection} = api

	const actionPath = '/ui'
	let formaction = 'updateState'

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
	let markdowns = $derived($page.data.markdowns)
	let content = $derived($page.data.content)
</script>

{#key path}
	<PlaybookCollection
		{category}
		{markdowns}
		path={`${path}${$page.url.hash}`}
		depth={1}
		isPage={true}
		{formaction}
		{actionPath}
		redirect={$page.url.pathname}
		{content}
	/>
{/key}
