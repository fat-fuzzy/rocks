<script lang="ts">
	import Image from './Image.svelte'
	import type {MediaProps} from '$types'
	import Picture from '$lib/components/blocks/media/Picture.svelte'

	let {
		id,
		src,
		ext,
		alt,
		orientation = 'landscape',
		dimensions = 'feature',
		loading,
		width,
		height,
		sources,
		media,
		sizes,
		style,
		context
	}: MediaProps = $props()

	let frameClass = $derived(
		dimensions === 'full'
			? ''
			: dimensions
				? `l:frame:${dimensions}`
				: 'l:frame',
	)

</script>

<ff-media>
	<div class={frameClass}>
		{#if !media}
			<Image
				{id}
				{src}
				{ext}
				{alt}
				{orientation}
				{width}
				{height}
				{sources}
				{sizes}
				{loading}
				{style}
				dimensions="full"
			/>
		{:else if media}
			<Picture
				{id}
				{src}
				{media}
				{ext}
				{alt}
				{orientation}
				{width}
				{height}
				{sources}
				{sizes}
				{loading}
				{style}
				dimensions="full"
				/>
		{/if}
	</div>
	{#if context}
		<div class="media-context">
			{@render context()}
		</div>
	{/if}
</ff-media>
