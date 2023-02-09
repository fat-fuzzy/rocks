<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleFamily} from './options'
	import {selectedStore} from '../stores/api'
	import mocks from '../../data/mocks'

	export let title = ''
	export let isPage = false
	export let component: ComponentType

	let selected: any
	selectedStore.subscribe((data) => {
		selected = data
	})
	const getFamilyOptionValue = (styleFamily: StyleFamily, styleOption: string) => {
		// TODO: filter include / exclude in here
		return typeof styleFamily !== 'string' ? styleFamily[styleOption] : ''
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: selected = $selectedStore
	$: theme = $selected.settings && getFamilyOptionValue($selected.settings, 'theme')
	$: content = $selected.content && getFamilyOptionValue($selected.content, 'content')
	$: sideContent = $selected.content && getFamilyOptionValue($selected.content, 'side')
	$: mainContent = $selected.content && getFamilyOptionValue($selected.content, 'main')
</script>

{#if !isPage}
	<svelte:component this={component} id={title} {...$selected}>
		{#if content === 'text'}
			{mocks[content]}
		{:else if content === 'card' || content === 'form'}
			{#each mocks[content] as item}
				<div class={`${item}`}>{item}</div>
			{/each}
		{/if}
	</svelte:component>
{:else if title === 'Sidebar'}
	<svelte:component this={component} id={title} {...selected}>
		<div slot="side">
			{#if sideContent === 'text'}
				{mocks[sideContent]}
			{:else if sideContent === 'card' || sideContent === 'form'}
				{#each mocks[sideContent] as item}
					<div class={`card box ${item}`}>{item}</div>
				{/each}
			{/if}
		</div>
		<div slot="main">
			{#if mainContent === 'text'}
				{mocks[mainContent]}
			{:else if mainContent === 'card' || mainContent === 'form'}
				{#each mocks[mainContent] as item}
					<div class={`card box ${item}`}>{item}</div>
				{/each}
			{/if}
		</div>
	</svelte:component>
{:else}
	<svelte:component this={component} id={title} {...selected}>
		{#if content === 'text'}
			{mocks[content]}
		{:else if content === 'card' || content === 'form'}
			{#each mocks[content] as item}
				<div class={`card box ${item}`}>{item}</div>
			{/each}
		{/if}
	</svelte:component>
{/if}
