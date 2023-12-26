<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from '.'

	import {onDestroy} from 'svelte'

	import {initStyles} from '$lib/api/styles'
	import type {StyleTree} from './types'

	import * as ui from '$stores/ui'

	export let title = ''
	export let component: ComponentType
	export let props: any
	export let stylesApi: StylesApi = initStyles()

	let breakpoint = props?.breakpoint || ''
	let layout = props?.layout || ''
	let color = props?.color || ''
	let status = props?.status || ''
	let context = props?.context || ''
	let variant = props?.variant || ''
	let asset = props?.asset || ''
	let size = props?.size || '' // element's own size

	let styles: StyleTree = stylesApi.getStyleTree()

	const stores = [
		ui.styles.subscribe((value) => {
			if (value) {
				styles = value
			}
		}),
	]

	// Block options
	$: variant = styles.blocks?.element.variant ?? variant
	$: color = styles.blocks?.element.color ?? color
	$: status = styles.blocks?.element.status ?? status
	$: context = styles.blocks?.element.context ?? context
	$: size = styles.blocks?.element.size ?? size
	$: asset = styles.blocks?.element.asset ?? asset
	// Layout options
	// - [layout + breakpoint] work together
	$: layout = styles.layouts?.layout.layout ?? layout
	$: breakpoint = styles.layouts?.layout.breakpoint ?? breakpoint
	$: props = {...props, asset, title, color, status, context, variant, size, layout, breakpoint}

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:component this={component} id={title} {...props} />
