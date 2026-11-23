<script lang="ts">
	import type {Block, NamespaceId, RouteNameFor} from '#types'

	import {EscapeHtml} from '@fat-fuzzy/ui'

	import {checkTags} from '#lib/common/tags.js'

	let {
		name,
		group,
		cta,
		tags,
		content,
		selectedTags,
	}: {
		selectedTags: string[]
		cta: RouteNameFor<NamespaceId>
		group?: string
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
	{#if cta !== 'preview'}
		<details
			id={`block-${name}`}
			data-block={name}
			class="l:stack:xs shape:soft"
			open
		>
			<summary
				class="w:full raviolink variant:bare surface:1:neutral font:heading font:semibold size:xs font:xs shape:mellow"
			>
				{group ?? 'Default'} > {name}
			</summary>

			<EscapeHtml id={builderId} {html} size="2xl" />
		</details>
	{:else}
		<EscapeHtml id={builderId} {html} size="2xl" />
	{/if}
{/if}
