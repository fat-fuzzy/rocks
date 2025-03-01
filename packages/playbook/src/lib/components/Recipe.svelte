<script lang="ts">
	import {getContext} from 'svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	type Props = {
		id?: string
		title: string
		name?: string
		SpecifiedElement: any // TODO: fix types
		props: any
		formaction?: string
		actionPath?: string
		redirect?: string
	}

	let {
		id,
		title,
		name,
		SpecifiedElement,
		props,
		formaction,
		actionPath,
		redirect,
	}: Props = $props()

	let page = ''

	let actor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(actor.styles)
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
	{formaction}
	{actionPath}
	{redirect}
/>
