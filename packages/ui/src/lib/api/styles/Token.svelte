<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'
	import type {StylesApi} from '$lib/api/styles'

	import {onDestroy} from 'svelte'

	import {initStyles} from '$lib/api/styles'
	import * as ui from '$stores/ui'

	export let title = ''
	export let component: ComponentType
	export let props: any
	export let stylesApi: StylesApi = initStyles()

	let layout = 'card'
	let color = ''
	let variant = ''
	let asset = props?.asset || ''
	let size = '' // element's own size
	let typography = '' // element's own size

	let styles: StyleTree = stylesApi.getStyleTree()

	const stores = [
		ui.styles.subscribe((value) => {
			if (value) {
				styles = value
			}
		}),
	]

	// Block options
	// $: variant = styles.tokens?.element.variant ?? variant
	$: color = styles.tokens?.element.color ?? color
	$: typography = styles.tokens?.element.typography ?? typography
	// Layout options
	// - [layout + breakpoint] work together
	// $: layout = styles.shared?.layout.layout ?? layout
	// $: breakpoint = styles.shared?.layout.breakpoint ?? breakpoint
	$: props = {...props, asset, title, color, variant, size, layout}

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:component this={component} id={title} {...props} />
