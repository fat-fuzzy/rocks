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

	$: selected = $selectedStore
	$: content = selected.layouts?.children.content ?? 'card'
	$: sideContent = selected.layouts?.children.side ?? 'card'
	$: mainContent = selected.layouts?.children.main ?? 'text'
	$: size = selected.shared?.context.size ?? ''
</script>

{#if !isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {...selected}>
			<div slot="side">
				{#if sideContent === 'text'}
					{mocks[sideContent]}
				{:else if sideContent === 'card' || sideContent === 'form'}
					{#each mocks[sideContent] as item}
						<div class={`card box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
			<div slot="main">
				{#if mainContent === 'text'}
					{mocks[mainContent]}
				{:else if mainContent === 'card' || mainContent === 'form'}
					{#each mocks[mainContent] as item}
						<div class={`card box ${item} ${size}`}>{item}</div>
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
					<div class={`card box ${item} ${size}`}>{item}</div>
				{/each}
			{/if}
		</svelte:component>
	{/if}
{:else if title === 'Sidebar'}
	<svelte:component this={component} id={title}>
		<div slot="side">
			{#if sideContent === 'text'}
				{mocks[sideContent]}
			{:else if sideContent === 'card' || sideContent === 'form'}
				{#each mocks[sideContent] as item}
					<div class={`card box ${item} ${size}`}>{item}</div>
				{/each}
			{/if}
		</div>
		<div slot="main">
			{#if mainContent === 'text'}
				{mocks[mainContent]}
			{:else if mainContent === 'card' || mainContent === 'form'}
				{#each mocks[mainContent] as item}
					<div class={`card box ${item} ${size}`}>{item}</div>
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
				<div class={`card box ${item} ${size}`}>{item}</div>
			{/each}
		{/if}
	</svelte:component>
{/if}
