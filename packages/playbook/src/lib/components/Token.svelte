<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		SpecifiedElement: any // TODO: fix type
		props: any // TODO: fix type
	}

	let {title, SpecifiedElement, props}: Props = $props()

	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let tokenStyles = $derived(styles.tokens?.families?.element || '')

	let variant = ''
	let size = '' // element's own size
	let asset = $derived(props?.asset || '')
	let color = $derived(tokenStyles?.color || '')
	let typography = $derived(tokenStyles?.typography || '')
</script>

<SpecifiedElement id={title} {variant} {asset} {color} {size} {typography} />
