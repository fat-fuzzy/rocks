<script lang="ts">
	import type {Component} from 'svelte'
	import {getContext} from 'svelte'
	import {PlaybookActor} from '#lib/api/actor.svelte.js'

	type Props = {
		title: string
		name?: string
		SpecifiedElement: Component
		props: object // TODO: fix types
	}

	let {title, name = title, SpecifiedElement, props}: Props = $props()

	let playbookActor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(playbookActor.styles)
	let blockStyles = $derived(styles.blocks?.families?.block || '')
</script>

<SpecifiedElement id={title} {name} {...props} {...blockStyles} />
