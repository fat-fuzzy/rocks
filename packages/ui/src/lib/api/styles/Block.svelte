<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {currentStyles} from '$lib/stores/api'

	let styles: StyleTree
	export let title = ''
	export let component: ComponentType
	export let props: any

	let breakpoint = ''
	let layout = ''
	let color = ''
	let variant = ''
	let asset = props?.asset || ''
	let size = '' // element's own size

	$: styles = $currentStyles
	// Block options
	$: variant = styles.blocks?.element.variant ?? variant
	$: color = styles.blocks?.element.color ?? color
	$: size = styles.blocks?.element.size ?? size
	$: asset = styles.blocks?.element.asset ?? asset
	// Layout options
	// - [layout + breakpoint] work together
	$: layout = styles.shared?.layout.layout ?? layout
	$: breakpoint = styles.shared?.layout.breakpoint ?? breakpoint
	$: props = {...props, asset, title, color, variant, size, layout, breakpoint}
</script>

<svelte:component this={component} id={title} {...props} />
