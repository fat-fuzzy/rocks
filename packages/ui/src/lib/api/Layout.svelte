<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleFamily} from './options'
	import {selectedLayout} from '../stores/api'
	import mocks from '../../data/mocks'

	export let title = ''
	export let isPage = false
	export let component: ComponentType

	const getFamilyOptionValue = (styleFamily: StyleFamily, styleOption: string) => {
		// TODO: filter include / exclude in here
		return typeof styleFamily !== 'string' ? styleFamily[styleOption] : ''
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: theme = $selectedLayout.settings && getFamilyOptionValue($selectedLayout.settings, 'theme')
	$: content = $selectedLayout.content && getFamilyOptionValue($selectedLayout.content, 'content')
	$: sideContent = $selectedLayout.content && getFamilyOptionValue($selectedLayout.content, 'side')
	$: mainContent = $selectedLayout.content && getFamilyOptionValue($selectedLayout.content, 'main')
</script>

{#if !isPage}
	<svelte:component this={component} id={title} {...$selectedLayout}>
		{#if content === 'text'}
			{mocks[content]}
		{:else if content === 'card' || content === 'form'}
			{#each mocks[content] as item}
				<div class={`${item}`}>{item}</div>
			{/each}
		{/if}
	</svelte:component>
{:else if title === 'Sidebar'}
	<svelte:component this={component} id={title} {...$selectedLayout}>
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
	<svelte:component this={component} id={title} {...$selectedLayout}>
		{#if content === 'text'}
			{mocks[content]}
		{:else if content === 'card' || content === 'form'}
			{#each mocks[content] as item}
				<div class={`card box ${item}`}>{item}</div>
			{/each}
		{/if}
	</svelte:component>
{/if}
