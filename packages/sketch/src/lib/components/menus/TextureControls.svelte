<script lang="ts">
	import type {TextureControlProps} from '$types'
	import Filters from '$lib/components/texture/Filters.svelte'
	import actor from '$lib/components/sketch/actor.svelte'

	let {size = 'xs', onupdate, filters}: TextureControlProps = $props()

	let channels = filters.channels
	let blur = filters.blur
	let convolutions = filters.convolutions
</script>

<Filters
	id="texture-filters"
	{size}
	layout="switcher"
	disabled={actor.getSketchDisabled()}
	{channels}
	{blur}
	{convolutions}
	{onupdate}
/>
