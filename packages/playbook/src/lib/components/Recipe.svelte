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

	let {
		title,
		name = title,
		component,
		props,
		actionPath,
		redirect,
	}: Props = $props()

	let page = ''

	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let layoutStyles = $derived(styles.layouts.layout)
	let settings = $derived(playbookStore.app)

	let recipeProps = $derived({
		...props,
		page,
		title,
		name: `ui-${name}`,
		actionPath,
		redirect,
		// App settings (user controlled)
		...settings,
		// Block style options
		...elementStyles,
		// Layout style options
		...layoutStyles,
	})
</script>

{#key recipeProps}
	<svelte:component this={component} id={title} {...recipeProps} />
{/key}
