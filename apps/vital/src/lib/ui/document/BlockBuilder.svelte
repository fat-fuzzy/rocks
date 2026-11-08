<script lang="ts">
	import type {Block} from '#types'

	import {EscapeHtml} from '@fat-fuzzy/ui'

	import {checkTags} from '#lib/common/tags.js'

	let {
		name,
		tags,
		content,
		selectedTags,
	}: {
		selectedTags: string[]
	} & Block = $props()

	let tagsFound: string[] = $state([])

	let builderId = $derived(`builder-${name}`)

	let html = $derived(content.html)

	$effect(() => {
		if (selectedTags) {
			tagsFound = checkTags(tags, selectedTags)
		}
	})
</script>

{#if tags.length === 0 || tagsFound.length}
	<EscapeHtml id={builderId} {html} size="2xl" />
{/if}
