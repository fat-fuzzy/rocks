<script lang="ts">
	let {
		src,
		ext,
		alt,
		orientation = 'landscape',
		loading,
		width,
		height,
		sources,
		sizes,
	}: {
		src: string
		ext: string
		alt: string
		width: string
		height: string
		orientation?: 'landscape' | 'portrait'
		loading?: 'lazy' | 'eager'
		dimensions?: string
		sources: {width: string; height: string; format: string}[]
		sizes: {query?: string; slot: string}[]
	} = $props()

	let srcset = $derived(
		sources
			.map(({width, format}) => `${src}-${width}.${format} ${width}w`)
			.join(`, `),
	)
</script>

<img
	src={`${src}-${width}-${height}.${ext}`}
	{alt}
	{srcset}
	sizes={sizes
		.map(({query, slot}) => (query ? `${query} ${slot}` : slot))
		.join(`, `)}
	{loading}
/>
