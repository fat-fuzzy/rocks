<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './styles-api'
	import {selectedStore} from '../stores/api'

	export let uiState: StyleTree // TODO: figure out how to avoid this prop drilling	import {selectedStore} from '../stores/api'
	import mocks from '../../data/mocks'

	export let title = ''
	export let isPage = false
	export let component: ComponentType

	let selected = uiState
	let size = '' // element's own size
	let breakpoint = '' // element's own breakpoint
	let content = ''
	let sideContent = ''
	let mainContent = ''

	$: {
		selected = $selectedStore
		// Element options
		size = selected.shared?.context.size ?? ''
		// Container options
		// - [container + size] work together
		breakpoint = selected.shared?.context.breakpoint ?? breakpoint
		// Content options
		content = selected.layouts?.children.content ?? 'card'
		sideContent = selected.layouts?.children.side ?? 'card'
		mainContent = selected.layouts?.children.main ?? 'text'
	}
</script>

{#if !isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size}>
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
		<svelte:component this={component} id={title} {size} {breakpoint}>
			{#if content === 'text'}
				{mocks[content]}
			{:else if content === 'card' || content === 'form'}
				{#each mocks[content] as item}
					<div class={`card box ${item}`}>{item}</div>
				{/each}
			{/if}
		</svelte:component>
	{/if}
{:else if title === 'Sidebar'}
	<svelte:component this={component} id={title} {size} {breakpoint}>
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
	<svelte:component this={component} id={title} {size} {breakpoint}>
		{#if content === 'text'}
			{mocks[content]}
		{:else if content === 'card' || content === 'form'}
			{#each mocks[content] as item}
				<div class={`card box ${item}`}>{item}</div>
			{/each}
		{/if}
	</svelte:component>
{/if}
