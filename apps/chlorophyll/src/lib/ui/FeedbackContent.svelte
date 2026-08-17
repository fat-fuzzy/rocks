<script lang="ts">
	import type {DocContentType, Slug} from '$types'

	import ui from '@fat-fuzzy/ui'

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

	const dedupedTags = $derived(Array.from(new Set(tags)))
</script>

<div class="maki:block">
	<Feedback
		context="prose"
		variant="bare"
		size="md"
		asset="none"
		surface="primary"
		surfaceLightness={0}
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
		{:else if isHidden}
			<p>
				Hidden {content_type}:
				<span class="font:bold">
					{name}
				</span>
			</p>
		{:else}
			<div class="l:stack:xs">
				<div class="l:flex justify:between">
					<h3>{name}</h3>
					<h4 class="font:semibold font:heading text:end">Tags</h4>
				</div>
				{#if tags?.length}
					<div class="w:full l:stack:xs justify:end">
						<ul class="tags unstyled l:flex:xs">
							{#each dedupedTags as tag, i (i)}
								<li class="variant:outline raviolink shape:pill font:xs">
									<span class="maki:inline"> {tag}</span>
								</li>
							{/each}
						</ul>
					</div>
				{:else}
					<p>Add a Block to get started</p>
				{/if}
			</div>
		{/if}
	</Feedback>
</div>
