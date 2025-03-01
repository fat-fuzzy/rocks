<script lang="ts">
	import {getContext} from 'svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	type Props = {
		title: string
		name?: string
		isPage?: boolean
		SpecifiedElement: any // TODO: fix types
		props: any // TODO: fix types
	}

	let {title, name = title, SpecifiedElement, props}: Props = $props()

	const actor: PlaybookActor = getContext('playbookActor')

	let styles = $derived(actor.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
</script>

<SpecifiedElement id={title} {name} {...props} {...elementStyles} />
