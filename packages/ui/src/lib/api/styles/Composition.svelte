<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'
	import type {StylesApi} from './styles-api'

	import {onDestroy} from 'svelte'

	import {initStyles} from './styles-api'
	import * as ui from '$stores/ui'

	export let stylesApi: StylesApi = initStyles()

	export let title = ''
	export let component: ComponentType
	export let props: any

	let breakpoint = props?.breakpoint || ''
	let threshold = props?.threshold || ''
	let layout = props?.layout || ''
	let color = props?.color || ''
	let variant = props?.variant || ''
	let asset = props?.asset || ''
	let size = props?.size || '' // element's own size

	let background = ''
	let page = ''

	let styles: StyleTree = stylesApi.getStyleTree()
	let settings = styles.app

	const stores = [
		ui.styles.subscribe((value) => {
			if (value) {
				styles = value
			}
		}),
		ui.app.subscribe((value) => {
			if (value) {
				settings = {app: value}
			}
		}),
	]

	// Block options
	$: variant = styles.blocks?.element.variant ?? variant
	$: color = styles.blocks?.element.color ?? color
	$: size = styles.blocks?.element.size ?? size
	$: background = settings.app.contrast ?? background
	// Layout options
	// - [layout + breakpoint] work together
	$: layout = styles.shared?.layout.layout ?? layout
	$: breakpoint = styles.shared?.layout.breakpoint ?? breakpoint
	$: threshold = styles.shared?.layout.threshold ?? threshold

	$: props = {
		...props,
		page,
		title,
		color,
		variant,
		size,
		layout,
		breakpoint,
		threshold,
		asset,
		background,
	}

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:component this={component} id={title} {...props} />
