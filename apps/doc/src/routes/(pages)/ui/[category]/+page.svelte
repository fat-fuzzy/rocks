<script lang="ts">
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'

	const {PlaybookCollection} = api

	const actionPath = '/ui'

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
	let markdowns = $derived($page.data.markdowns)
	let content = $derived($page.data.content)
</script>

<PlaybookCollection
	{path}
	{category}
	{markdowns}
	{actionPath}
	depth={1}
	isPage={true}
	redirect={$page.url.pathname}
	{content}
/>
