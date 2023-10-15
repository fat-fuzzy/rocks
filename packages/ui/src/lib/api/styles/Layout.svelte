<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {currentStyles} from '$lib/stores/api'

	import mocks from '$lib/data/mocks' // TODO: load text from README.md

	export let title = ''
	export let isPage = false
	export let component: ComponentType
	export let props: any

	let styles: StyleTree
	let size = '' // element's own size
	let breakpoint = '' // element's own breakpoint
	let content = ''
	let sideContent = ''
	let mainContent = ''

	$: {
		styles = $currentStyles
		// Element options
		size = styles.layouts?.element?.size ?? ''
		breakpoint = styles.shared?.context.breakpoint ?? breakpoint
		// Content options
		content = styles.layouts?.element.content ?? 'card'
		sideContent = styles.layouts?.element.side ?? 'card'
		mainContent = styles.layouts?.element.main ?? 'text'
	}
</script>

{#if !isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {...props}>
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
		<svelte:component this={component} id={title} {size} {breakpoint} {...props}>
			<svelte:fragment slot="content">
				{#each mocks['form'] as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			</svelte:fragment>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {breakpoint} {...props}>
			{#each mocks['card'] as item}
				<div class={`card:${size} box ${item} ${size}`}>{item}</div>
			{/each}
		</svelte:component>
	{/if}
{:else if isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {breakpoint} {...props}>
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
		<svelte:component this={component} id={title} {size} {breakpoint} } {...props}>
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
		<svelte:component this={component} id={title} {size} {breakpoint} } {...props}>
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
