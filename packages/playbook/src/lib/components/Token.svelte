<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		component: any // TODO: fix type
		props: any // TODO: fix type
	}

	let {title, component, props}: Props = $props()

	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let tokenStyles = $derived(styles.tokens.element)

	let variant = ''
	let size = '' // element's own size

	// Block options
	// $: variant = styles.tokens?.element.variant ?? variant
	let componentProps = $derived({
		...props,
		asset: props?.asset || '',
		title,
		color: tokenStyles.color,
		variant,
		size,
		typography: tokenStyles.typography,
	})
</script>

<svelte:component this={component} id={title} {...componentProps} />
