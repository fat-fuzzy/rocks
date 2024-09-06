<script lang="ts">
	let {
		src,
		ext,
		alt,
		orientation = 'landscape',
		width,
		height,
		sources,
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
		// sizes: {width: string; size: string}[]
	} = $props()

	let srcset = $derived(
		sources
			.map(({width, format}) => `${src}-${width}.${format} ${width}w`)
			.join(`, `),
	)

	let sizes = $derived(
		sources.map(({width}) => `(min-width: ${width}px) ${width}px`).join(`, `),
	)
</script>

<img
	src={`${src}-${width}-${height}.${ext}`}
	{alt}
	{srcset}
	sizes={`100vw, ${sizes}`}
/>
