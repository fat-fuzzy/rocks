<script lang="ts">
	import type {Component} from 'svelte'
	import {getContext} from 'svelte'
	import {PlaybookActor} from '#lib/api/actor.svelte.js'

	type Props = {
		id?: string
		title: string
		name?: string
		SpecifiedElement: Component
		props: object
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

	let playbookActor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(playbookActor.styles)
	let blockStyles = $derived(styles.blocks?.families?.block || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')
	let recipeName = $derived(name ? name : title)
</script>

<SpecifiedElement
	{id}
	{page}
	{title}
	name={recipeName}
	{...containerStyles}
	{...layoutStyles}
	{...blockStyles}
	{...props}
	{formaction}
	{actionPath}
	{redirect}
/>
