<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {currentStyles} from '$lib/stores/api'

	let styles: StyleTree
	export let title = ''
	export let component: ComponentType
	export let props: any

	let layout = 'card'
	let color = ''
	let variant = ''
	let asset = props?.asset || ''
	let size = '' // element's own size
	let typography = '' // element's own size

	$: styles = $currentStyles
	// Block options
	// $: variant = styles.tokens?.element.variant ?? variant
	$: color = styles.tokens?.element.color ?? color
	$: typography = styles.tokens?.element.typography ?? typography
	// Layout options
	// - [layout + breakpoint] work together
	// $: layout = styles.shared?.context.layout ?? layout
	// $: breakpoint = styles.shared?.context.breakpoint ?? breakpoint
	$: props = {...props, asset, title, color, variant, size, layout}
</script>

<svelte:component this={component} id={title} {...props} />
