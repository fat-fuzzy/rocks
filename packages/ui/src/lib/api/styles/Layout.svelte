<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {selectedStore} from '$lib/stores/api'

	import mocks from '$lib/data/mocks' // TODO: load text from README.md

	export let title = ''
	export let isPage = false
	export let component: ComponentType

	let selected: StyleTree
	let size = '' // element's own size
	let breakpoint = '' // element's own breakpoint
	let content = ''
	let sideContent = ''
	let mainContent = ''

	$: {
		selected = $selectedStore
		// Element options
		size = selected.layouts?.element?.size ?? ''
		breakpoint = selected.shared?.context.breakpoint ?? breakpoint
		// Content options
		content = selected.layouts?.element.content ?? 'card'
		sideContent = selected.layouts?.element.side ?? 'card'
		mainContent = selected.layouts?.element.main ?? 'text'
	}
</script>

{#if !isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size}>
			<div slot="side">
				{#each mocks['card'] as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			</div>
			<div slot="main">
				{@html mocks['doc'][`textIntro`]}
			</div>
		</svelte:component>
	{:else if title === 'Reveal' || title === 'Burrito'}
		<svelte:component this={component} id={title} {size} {breakpoint}>
			<svelte:fragment slot="content">
				{#each mocks['form'] as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			</svelte:fragment>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {breakpoint}>
			{#each mocks['card'] as item}
				<div class={`card:${size} box ${item} ${size}`}>{item}</div>
			{/each}
		</svelte:component>
	{/if}
{:else if isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {breakpoint}>
			<div slot="side">
				{#if sideContent === 'text'}
					{@html mocks['doc'][sideContent]}
				{:else if sideContent === 'card' || sideContent === 'form'}
					{#each mocks[sideContent] as item}
						<div class={`card:${size} box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
			<div slot="main">
				{#if mainContent === 'text'}
					{@html mocks['doc'][mainContent]}
				{:else if mainContent === 'card' || mainContent === 'form'}
					{#each mocks[mainContent] as item}
						<div class={`card:${size} box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
		</svelte:component>
	{:else if title === 'Reveal' || title === 'Burrito'}
		<svelte:component this={component} id={title} {size} {breakpoint}>
			<div slot="content">
				{#if content === 'text'}
					{@html mocks['doc'][`${content}Intro`]}
				{:else if content === 'card' || content === 'form'}
					{#each mocks[content] as item}
						<div class={`card:${size} box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {breakpoint}>
			{#if content === 'text'}
				{@html mocks['doc'][content]}
			{:else if content === 'card' || content === 'form'}
				{#each mocks[content] as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			{/if}
		</svelte:component>
	{/if}
{/if}
