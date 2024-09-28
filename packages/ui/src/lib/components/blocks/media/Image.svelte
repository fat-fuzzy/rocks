<script lang="ts">
	import type {MediaProps} from '$types'

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
	}: MediaProps = $props()

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
	{width}
/>
