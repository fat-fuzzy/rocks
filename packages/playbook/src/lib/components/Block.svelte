<script lang="ts">
	import type {StylesApi} from '$lib/api/styles.api'

	import {getContext} from 'svelte'

	import type {StyleTree} from '$lib/api/styles.types'

	type Props = {
		title: string
		component: any // TODO: fix types
		props: any // TODO: fix types
	}

	let {title, component, props}: Props = $props()

	const stylesApi: StylesApi = getContext('stylesApi')
	let styles: StyleTree = $derived(stylesApi.getStyleTree())

	// Block options
	let variant = $derived(styles.blocks?.element.variant ? props?.color : '')
	let color = $derived(styles.blocks?.element.color ? props?.status : '')
	let status = $derived(styles.blocks?.element.status ? props?.context : '')
	let context = $derived(styles.blocks?.element.context ? props?.variant : '')
	let size = $derived(styles.blocks?.element.size ? props?.size : '') // element's own size
	let asset = $derived(styles.blocks?.element.asset ? props?.asset : '')
	let shape = $derived(styles.blocks?.element.shape ? props?.shape : '')
	// Layout options
	// - [layout + breakpoint] work together
	let layout = $derived(styles.layouts?.layout.layout ? props?.layout : '')
	let breakpoint = $derived(
		styles.layouts?.layout.breakpoint ? props?.breakpoint : '',
	)
	let threshold = $derived(
		styles.layouts?.layout.threshold ? props?.threshold : '',
	)

	let blockProps = $derived({
		...props,
		asset,
		title,
		color,
		status,
		context,
		variant,
		size,
		shape,
		layout,
		threshold,
		breakpoint,
	})
</script>

<svelte:component this={component} id={title} {...blockProps} />
