<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		name?: string
		SpecifiedElement: any // TODO: fix types
		props: any
		actionPath?: string
		redirect?: string
	}

	let {title, name, SpecifiedElement, props, actionPath, redirect}: Props =
		$props()

	let page = ''

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
	let recipeName = $derived(name ? `ui-${name}` : `ui-${title}`)
</script>

<SpecifiedElement
	id={title}
	{page}
	{title}
	name={recipeName}
	{...layoutStyles}
	{...elementStyles}
	{...props}
	{actionPath}
	{redirect}
/>
