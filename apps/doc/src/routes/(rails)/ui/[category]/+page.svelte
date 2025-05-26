<script lang="ts">
	import {page} from '$app/state'
	import playbook from '@fat-fuzzy/playbook'

	const {PlaybookCollection} = playbook

	let formaction = 'updateState'

	let path = $derived(page.url.pathname)
	let category = $derived(page.params.category)
	let markdowns = $derived(page.data.markdowns)
	let content = $derived(page.data.content)
</script>

{#key category}
	<PlaybookCollection
		{category}
		{markdowns}
		path={`${path}${page.url.hash}`}
		depth={1}
		isPage={true}
		{formaction}
		{content}
	/>
{/key}
