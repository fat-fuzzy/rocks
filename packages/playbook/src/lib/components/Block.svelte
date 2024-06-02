<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		name?: string
		component: any // TODO: fix types
		props: any // TODO: fix types
	}

	let {title, name = title, component, props}: Props = $props()

	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let containerStyles = $derived(styles.layouts.container)

	let blockProps = $derived({
		...props,
		name,
		// Block style options
		...elementStyles,
	})
</script>

{#key blockProps}
	{#if containerStyles.container}
		<div class={`l:${containerStyles.container}:${containerStyles.size}`}>
			<svelte:component this={component} id={title} {...blockProps} />
		</div>
	{:else}
		<svelte:component this={component} id={title} {...blockProps} />
	{/if}
{/key}
