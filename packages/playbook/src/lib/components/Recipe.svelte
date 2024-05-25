<script lang="ts">
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleTree} from '$lib/api/styles.types'

	import {getContext} from 'svelte'

	import * as ui from '$lib/api/store.svelte'

	type Props = {
		title: string
		name?: string
		component: any // TODO: fix types
		props: any
		actionPath?: string
		redirect?: string
		settings?: any
	}

	let {
		title,
		name = title,
		component,
		props,
		actionPath,
		redirect,
		settings = ui,
	}: Props = $props()

	let page = ''

	const stylesApi: StylesApi = getContext('stylesApi')
	let styles: StyleTree = $derived(stylesApi.getStyleTree())

	// Block options
	let color = $derived(styles.blocks?.element.color ? props?.color : '')
	let size = $derived(styles.blocks?.element.size ? props?.size : '') // element's own size
	let asset = $derived(styles.blocks?.element.asset ? props?.asset : '')
	let variant = $derived(styles.blocks?.element.variant ? props?.variant : '')
	// Layout options
	// - [layout + breakpoint] work together
	let layout = $derived(styles.layouts?.layout.layout ? props?.layout : '')
	let threshold = $derived(
		styles.layouts?.layout.threshold ? props?.threshold : '',
	)
	let breakpoint = $derived(
		styles.blocks?.element.breakpoint ? props?.breakpoint : '',
	)

	let recipeProps = $derived({
		...props,
		page,
		title,
		asset,
		color,
		variant,
		size,
		layout,
		breakpoint,
		threshold,
		name: `ui-${name}`,
		settings,
		actionPath,
		redirect,
	})
</script>

<svelte:component this={component} id={title} {...recipeProps} />
