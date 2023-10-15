<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {getProps} from '$lib/api/fixtures/js/fixtures-api'
	import {currentStyles} from '$lib/stores/api'

	let styles: StyleTree
	export let title = ''
	export let component: ComponentType
	let category = 'blocks'
	export let props = getProps({category, component: title})

	let breakpoint = ''
	let layout = ''
	let color = ''
	let variant = ''
	let asset = props.asset || ''
	let text = props.text || ''
	let size = '' // element's own size

	$: styles = $currentStyles
	// Block options
	$: variant = styles.blocks?.element.variant ?? variant
	$: color = styles.blocks?.element.color ?? color
	$: size = styles.blocks?.element.size ?? size
	$: asset = styles.blocks?.element.asset ?? asset
	// Layout options
	// - [layout + breakpoint] work together
	$: layout = styles.shared?.context.layout ?? layout
	$: breakpoint = styles.shared?.context.breakpoint ?? breakpoint
</script>

<svelte:component
	this={component}
	id={title}
	{text}
	{asset}
	{...props}
	{title}
	{color}
	{variant}
	{size}
	{layout}
	{breakpoint}
/>
