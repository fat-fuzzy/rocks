<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		name?: string
		component: any // TODO: fix types
		props: any // TODO: fix types
	}

	let {title, name = title, component, props}: Props = $props()

	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let layoutStyles = $derived(styles.layouts.layout)

	let blockProps = $derived({
		...props,
		name,
		// Block style options
		asset: elementStyles.asset,
		color: elementStyles.color,
		context: elementStyles.context,
		size: elementStyles.size,
		shape: elementStyles.shape,
		status: elementStyles.status,
		variant: elementStyles.variant,
		// Layout style options
		layout: layoutStyles.layout,
		threshold: layoutStyles.threshold,
		breakpoint: layoutStyles.breakpoint,
	})
</script>

{#key blockProps}
	<svelte:component this={component} id={title} {...blockProps} />
{/key}
