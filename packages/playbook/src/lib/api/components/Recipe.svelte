<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from '$lib/api/components/styles.api'
	import type {StyleTree} from '$lib/api/components/styles.types'

	import {onDestroy, getContext} from 'svelte'

	import * as ui from '$stores/ui'

	type Props = {
		title: string
		name?: string
		component: ComponentType
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
	let styles: StyleTree = stylesApi.getStyleTree()

	const stores = [
		settings.styles.subscribe((value) => {
			if (value) {
				styles = stylesApi.getStyleTree()
			}
		}),
	]

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

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:component this={component} id={title} {...recipeProps} />
