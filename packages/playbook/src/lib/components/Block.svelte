<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		name?: string
		isPage?: boolean
		component: any // TODO: fix types
		props: any // TODO: fix types
	}

	let {title, name = title, isPage, component, props}: Props = $props()

	const playbookStore: typeof PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let containerStyles = $derived(styles.layouts.container)
</script>

{#if isPage && containerStyles.container}
	<div class={`l:${containerStyles.container}:${containerStyles.size}`}>
		<svelte:component
			this={component}
			id={title}
			{name}
			{...props}
			{...elementStyles}
		/>
	</div>
{:else}
	<svelte:component
		this={component}
		id="{title}{name}"
		{...props}
		{...elementStyles}
	/>
{/if}
