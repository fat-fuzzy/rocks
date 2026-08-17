<script lang="ts">
	import type {DocContentType, Slug} from '$types'

	import ui from '@fat-fuzzy/ui'
	import CardContent from '$lib/ui/CardContent.svelte'

	const {Feedback} = ui.blocks

	let {
		content_type,
		name,
		tags,
		isHidden,
		isEmpty,
		isError,
	}: {
		content_type: DocContentType
		name: Slug
		tags?: string[]
		isHidden?: boolean
		isEmpty?: boolean
		isError?: boolean
	} = $props()
</script>

<div class="maki:block">
	<Feedback
		context="prose"
		size="md"
		asset="none"
		surface={content_type === 'section' ? 'accent' : 'primary'}
		variant="bare"
		surfaceLightness={content_type === 'section' ? 1 : 0}
	>
		{#if isError}
			<p>Failed to load content for {name}.</p>
		{:else if isEmpty}
			<p class="font:bold">No content found for {name}</p>
			<div class="ravioli:md">
				<p>To fix this:</p>
				<ul>
					<li>Unselect and re-select all sections to remove this message</li>
					<li>
						If you have saved this content to a backup, you can import it (this
						will delete the current document)
					</li>
					<li>
						If this is a default section: you can re-seed content from markdown
						defaults
					</li>
				</ul>
			</div>
		{:else}
			<CardContent {content_type} {name} {tags} {isHidden} />
		{/if}
	</Feedback>
</div>
