<script lang="ts">
	import type {DocContentType, Slug} from '$types'

	let {
		content_type,
		name,
		tags,
		isHidden,
	}: {
		content_type: DocContentType
		name: Slug
		tags?: string[]
		isHidden?: boolean
	} = $props()

	const dedupedTags = $derived(Array.from(new Set(tags)))
</script>

{#if content_type === 'section' && isHidden}
	<div class="l:stack:xs">
		<div class="card l:flex:4xs justify:between">
			<h3>{name}</h3>
			<h4 class="font:semibold font:heading text:end">{content_type} Tags</h4>
		</div>
		<div class="w:full l:stack:xs justify:end">
			<ul class="tags unstyled l:flex:xs">
				<li class="variant:outline raviolink shape:pill font:xs">
					<span class="maki:inline"> hidden</span>
				</li>
			</ul>
		</div>
	</div>
{:else}
	<div class="l:stack:xs">
		<div class="l:flex justify:between">
			<div class="card l:flex:4xs">
				<h3>{name}</h3>
			</div>
			<h4 class="font:semibold font:heading text:end">
				{content_type} tags
			</h4>
		</div>
		<div class="l:flex justify:between">
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
				<p class="w:full text:end">Add a Block to get started</p>
			{/if}
		</div>
	</div>
{/if}
