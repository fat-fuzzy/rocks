<script lang="ts">
	import Image from './Image.svelte'

	let {
		src,
		ext,
		alt,
		orientation = 'landscape',
		width,
		height,
		sources,
		// srcset,
		// sizes,
	}: {
		src: string
		ext: string
		alt: string
		width: string
		height: string
		orientation?: 'landscape' | 'portrait'
		dimensions?: string
		sources: {width: string; height: string; format: string}[]
		// srcset: {width: string; descriptors: {mq: string; dpr: number}[]}[]
		// sizes: {width: string; size: string}[]
	} = $props()
</script>

<picture>
	{#each sources as source}
		<source
			srcset={`${src}-${source.width}.${source.format}`}
			media={`(min-width: ${source.width}px)`}
			width={source.width}
		/>
	{/each}
	<Image {src} {ext} {alt} {orientation} {width} {height} {sources} />
</picture>
