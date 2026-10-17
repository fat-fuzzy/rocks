<script lang="ts">
	import type {DocContentType, Slug} from '#types'
	import type {UiSurface} from '@fat-fuzzy/ui'

	import ui from '@fat-fuzzy/ui'
	import CardContent from '#lib/ui/CardContent.svelte'

	const {Feedback} = ui.blocks

	let {
		surface = 'neutral',
		content_type,
		name,
		tags,
		isHidden,
		isEmpty,
		error,
	}: {
		surface?: UiSurface
		content_type: DocContentType
		name: Slug
		tags?: string[]
		isHidden?: boolean
		isEmpty?: boolean
		error?: string
	} = $props()

	// TODO: Better color management
	let chroma = $derived(surface === 'accent' ? 'chroma:1' : '')
	let surfaceLightness = $derived(surface === 'neutral' ? 1 : 0)
</script>

<Feedback
	context="prose"
	size="sm"
	asset="none"
	status={error ? 'error' : undefined}
	surface={`${surface} ${chroma}`}
	variant="bare"
	{surfaceLightness}
	{chroma}
>
	{#if error}
		<p>
			Failed to load content for {content_type}
			<span class="font:bold font:heading">{name}</span>
		</p>
		<p>{error}</p>
	{:else if isEmpty}
		<h3>
			No content found for {content_type} "{name}"
		</h3>
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
