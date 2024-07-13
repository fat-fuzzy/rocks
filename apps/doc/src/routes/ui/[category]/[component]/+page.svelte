<script lang="ts">
	import {page} from '$app/stores'
	import {api} from '@fat-fuzzy/playbook'

	const {PlaybookElement} = api

	const actionPath = '/ui'

	let path = $derived($page.url.pathname)
	let category = $derived($page.params.category)
	let title = $derived($page.params.component)
	let markdowns = $derived(
		$page.data.markdowns && $page.data.markdowns[category]
			? $page.data.markdowns[category]
			: [],
	)
	let markdownContent = $derived(
		markdowns.find(({meta}) => meta.title === title) || {
			html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
		},
	)
</script>

<PlaybookElement
	{title}
	{category}
	meta={markdownContent.meta}
	markdown={markdownContent}
	{path}
	{actionPath}
	redirect={$page.url.pathname}
/>
