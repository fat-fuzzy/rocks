<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		id?: string
		title: string
		name?: string
		SpecifiedElement: any // TODO: fix types
		props: any
		actionPath?: string
		redirect?: string
	}

	let {id, title, name, SpecifiedElement, props, actionPath, redirect}: Props =
		$props()

	let page = ''

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')
	let recipeName = $derived(name ? `ui-${name}` : `ui-${title}`)
</script>

<SpecifiedElement
	id={id ?? title}
	{page}
	{title}
	name={recipeName}
	{...containerStyles}
	{...layoutStyles}
	{...elementStyles}
	{...props}
	{actionPath}
	{redirect}
/>
