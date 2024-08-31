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
		sources: [string, string, string][]
	} = $props()
</script>

<picture>
	{#each sources as [_width, _height, _ext]}
		<source
			srcset={`${src}-${_width}-${_height}.${_ext}`}
			media={`(orientation: ${orientation})`}
		/>
	{/each}
	<img src={`${src}-${width}-${height}.${ext}`} {alt} />
</picture>
