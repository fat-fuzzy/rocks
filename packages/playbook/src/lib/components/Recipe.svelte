<script lang="ts">
	import {getContext} from 'svelte'

	type Props = {
		title: string
		name?: string
		component: any // TODO: fix types
		props: any
		actionPath?: string
		redirect?: string
	}

	let {title, name, component, props, actionPath, redirect}: Props = $props()

	let page = ''

	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let layoutStyles = $derived(styles.layouts.layout)
	let settings = $derived(playbookStore.app)
	let recipeName = $derived(name ? `ui-${name}` : `ui-${title}`)
</script>

<svelte:component
	this={component}
	id={title}
	{page}
	{title}
	name={recipeName}
	{actionPath}
	{redirect}
	{...props}
	{...settings}
	{...elementStyles}
	{...layoutStyles}
/>
