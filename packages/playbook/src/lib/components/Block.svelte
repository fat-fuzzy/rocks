<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		name?: string
		isPage?: boolean
		component: any // TODO: fix types
		props: any // TODO: fix types
	}

	let {title, name = title, component, props}: Props = $props()

	const playbookStore: typeof PlaybookStore = getContext('playbookStore')

	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.families.element)
</script>

<svelte:component
	this={component}
	id={title}
	{name}
	{...props}
	{...elementStyles}
/>
