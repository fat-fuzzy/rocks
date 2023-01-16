<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import StoryOptions from './StoryOptions.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import type {UIProps} from './story-options'

	export let title = 'Unnamed Component'
	export let slug = 'unnamed-component'
	export let component: ComponentType
	export let initial: UIProps
	export let showOptions = false

	// TODO: figure out how I can deduct props from component
	let selected = {...initial}

	const setCurrent = (event) => {
		selected = {...selected, [event.detail.id]: event.detail.value}
		console.log('Story - selected')
		console.log(selected)
	}
</script>

<article class={`l-stack card:lg`}>
	{#if $page.params.component === slug}
		<h1>{title}</h1>
	{:else}
		<h2>{title}</h2>
	{/if}

	<Sidebar size="xs" placement="end" theme={`card:lg ${selected.theme ?? 'card:lg'}`}>
		<svelte:fragment slot="main">
			{#if component}
				<svelte:component this={component} {...selected} />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="side">
			{#if showOptions}
				<StoryOptions {selected} on:changed={setCurrent} />
			{/if}
		</svelte:fragment>
	</Sidebar>
</article>
