<script lang="ts">
	import {page} from '$app/state'
	import playbook from '@fat-fuzzy/playbook'
	import pageActor from '../../services/actor.svelte'

	const {PlaybookElement} = playbook

	let formaction = 'updateState'
	let context = $derived(pageActor.getContext())
	let actor = $derived(pageActor.getActor())

	let path = $derived(page.url.pathname)
	let category = $derived(page.params.category)
	let title = $derived(page.params.component)
	let content = $derived(page.data.content)
</script>

<PlaybookElement
	{title}
	{category}
	{content}
	path={`${path}${page.url.hash}`}
	{formaction}
	{actor}
	{context}
/>
