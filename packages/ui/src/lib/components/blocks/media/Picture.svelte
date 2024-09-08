<script lang="ts">
	import Image from './Image.svelte'

	let {
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
	}: {
		src: string
		ext: string
		alt: string
		width: string
		height: string
		orientation?: 'landscape' | 'portrait'
		dimensions?: string
		loading?: string
		sources: {width: string; height: string; format: string}[]
		media: {query?: string; srcset: {width: string; dpr: number}[]}[]
		sizes: {query?: string; slot: string}[]
	} = $props()

	let frameClass = $derived(
		dimensions === 'full'
			? ''
			: dimensions
				? `l:frame:${dimensions}`
				: 'l:frame',
	)

	function getSources(width: string) {
		const _sources = sources.filter(({width: w}) => w === width)
		if (!_sources) return [`${src}-${width}.${ext}`]
		return _sources.map((source) => `${src}-${source.width}.${source.format}`)
	}

	function getSrcset(srcset: {width: string; dpr: number}[]) {
		return srcset
			.map(({width, dpr}) => {
				const _sources = getSources(width)
				return _sources.map((source) => `${source} ${dpr}x`).join(`, `)
			})
			.join(`, `)
	}

	let srcset = $derived(
		media.map(({query, srcset}) => ({query, srcset: getSrcset(srcset)})),
	)
</script>

<picture class={frameClass}>
	{#each srcset as set}
		<source srcset={set.srcset} media={set.query} />
	{/each}
	<Image
		{src}
		{ext}
		{alt}
		{orientation}
		{width}
		{height}
		{sources}
		{sizes}
		{loading}
	/>
</picture>
