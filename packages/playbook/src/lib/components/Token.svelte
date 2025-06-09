<script lang="ts">
	import {getContext} from 'svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	type Props = {
		title: string
		SpecifiedElement: any // TODO: fix type
		props: any // TODO: fix type
	}

	let {title, SpecifiedElement, props}: Props = $props()

	const actor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(actor.styles)
	let tokenStyles = $derived(styles.tokens?.families?.token || '')

	let variant = ''
	let size = '' // token's own size
	let asset = $derived(props?.asset || '')
	let color = $derived(tokenStyles?.color || '')
	let typography = $derived(tokenStyles?.typography || '')
</script>

<SpecifiedElement id={title} {variant} {asset} {color} {size} {typography} />
