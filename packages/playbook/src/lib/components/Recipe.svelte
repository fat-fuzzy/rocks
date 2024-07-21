<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

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

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
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
	{...layoutStyles}
	{...elementStyles}
	{...props}
/>
