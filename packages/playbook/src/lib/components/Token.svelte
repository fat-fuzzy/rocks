<script lang="ts">
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleTree} from '$lib/api/styles.types'

	import {getContext} from 'svelte'

	type Props = {
		title: string
		component: any // TODO: fix type
		props: any // TODO: fix type
	}

	let {title, component, props}: Props = $props()

	const stylesApi: StylesApi = getContext('stylesApi')

	let variant = ''
	let asset = props?.asset || ''
	let size = '' // element's own size

	let styles: StyleTree = $derived(stylesApi.getStyleTree())

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
</script>

<svelte:component this={component} id={title} {...componentProps} />
