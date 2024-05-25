<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from '$lib/api/components/styles.api'
	import type {StyleTree} from '$lib/api/components/styles.types'

	import {onDestroy, getContext} from 'svelte'

	import * as ui from '$stores/ui'

	type Props = {
		title: string
		component: ComponentType
		props: any
	}

	let {title, component, props}: Props = $props()

	const stylesApi: StylesApi = getContext('stylesApi')

	let variant = ''
	let asset = props?.asset || ''
	let size = '' // element's own size

	let styles: StyleTree = $state(stylesApi.getStyleTree())

	const stores = [
		ui.styles.subscribe((value) => {
			if (value) {
				styles = stylesApi.getStyleTree()
			}
		}),
	]

	// Block options
	// $: variant = styles.tokens?.element.variant ?? variant
	let color = $derived(styles.tokens?.element.color ?? '')
	let typography = $derived(styles.tokens?.element.typography ?? '')
	let componentProps = $derived({
		...props,
		asset,
		title,
		color,
		variant,
		size,
		typography,
	})

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:component this={component} id={title} {...componentProps} />
