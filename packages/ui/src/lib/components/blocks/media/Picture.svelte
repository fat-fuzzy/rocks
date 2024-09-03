<script lang="ts">
	let {
		src,
		ext,
		alt,
		orientation = 'landscape',
		width,
		height,
		sources,
	}: {
		src: string
		ext: string
		alt: string
		width: string
		height: string
		orientation?: 'landscape' | 'portrait'
		dimensions?: string
		sources: {width: string; height: string; format: string}[]
	} = $props()

	let srcsetSources = $derived(sources)
</script>

<picture>
	{#each srcsetSources as source}
		<source
			srcset={`${src}-${source.width}.${source.format}`}
			media={`(min-width: ${source.width}px)`}
			width={source.width}
		/>
	{/each}
	<img src={`${src}-${width}-${height}.${ext}`} {alt} />
</picture>
