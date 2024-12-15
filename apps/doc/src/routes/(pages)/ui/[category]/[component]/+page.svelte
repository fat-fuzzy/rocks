<script lang="ts">
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'

	const {PlaybookElement} = api

	const actionPath = '/ui'
	let formaction = 'updateState'

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
	let title = $derived($page.params.component)
	let content = $derived($page.data.content)
</script>

{#key path}
	<PlaybookElement
		{title}
		{category}
		{content}
		path={`${path}${$page.url.hash}`}
		{formaction}
		{actionPath}
		redirect={$page.url.pathname}
	/>
{/key}
