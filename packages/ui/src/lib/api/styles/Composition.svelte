<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {currentStyles} from '$lib/stores/api'

	let styles: StyleTree
	export let title = ''
	export let component: ComponentType
	export let props: any

	let breakpoint = props?.breakpoint || ''
	let layout = props?.layout || ''
	let color = props?.color || ''
	let variant = props?.variant || ''
	let asset = props?.asset || ''
	let size = props?.size || '' // element's own size

	let background = ''
	let page = ''

	$: styles = $currentStyles
	// Block options
	$: variant = styles.blocks?.element.variant ?? variant
	$: color = styles.blocks?.element.color ?? color
	$: size = styles.blocks?.element.size ?? size
	$: background = styles.app?.settings.contrast ?? background
	// Layout options
	// - [layout + breakpoint] work together
	$: layout = styles.shared?.layout.layout ?? layout
	$: breakpoint = styles.shared?.layout.breakpoint ?? breakpoint

	$: props = {...props, page, title, color, variant, size, layout, breakpoint, asset, background}
</script>

<svelte:component this={component} id={title} {...props} />
