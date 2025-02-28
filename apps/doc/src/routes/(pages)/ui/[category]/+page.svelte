<script lang="ts">
	import {page} from '$app/state'
	import playbook from '@fat-fuzzy/playbook'
	import pageActor from '../services/actor.svelte'

	const {PlaybookCollection} = playbook

	let formaction = 'updateState'
	let context = $derived(pageActor.getContext())
	let actor = $derived(pageActor.getActor())

	let path = $derived(page.url.pathname)
	let category = $derived(page.params.category)
	let markdowns = $derived(page.data.markdowns)
	let content = $derived(page.data.content)
</script>

<PlaybookCollection
	{category}
	{markdowns}
	path={`${path}${page.url.hash}`}
	depth={1}
	isPage={true}
	{formaction}
	{content}
	{actor}
	{context}
/>
