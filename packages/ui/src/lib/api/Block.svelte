<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './styles-api'
	import {selectedStore} from '$lib/stores/api'

	let selected: StyleTree
	export let title = ''
	export let component: ComponentType

	let breakpoint = ''
	let layout = ''
	let color = ''
	let variant = ''
	let asset = ''
	let size = '' // element's own size

	$: {
		selected = $selectedStore
		// Block options
		variant = selected.blocks?.element.variant ?? variant
		color = selected.blocks?.element.color ?? color
		size = selected.blocks?.element.size ?? size
		asset = selected.blocks?.element.asset ?? asset
		// Layout options
		// - [layout + breakpoint] work together
		layout = selected.shared?.context.layout ?? layout
		breakpoint = selected.shared?.context.breakpoint ?? breakpoint
	}
</script>

<svelte:component
	this={component}
	id={title}
	{title}
	{color}
	{variant}
	{asset}
	{size}
	{layout}
	{breakpoint}
/>
