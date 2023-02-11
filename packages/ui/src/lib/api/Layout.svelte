<script lang="ts">
	import type {ComponentType} from 'svelte'
	import {selectedStore} from '../stores/api'
	import mocks from '../../data/mocks'

	export let title = ''
	export let isPage = false
	export let component: ComponentType

	$: selected = $selectedStore
	$: content = $selected.content?.content ?? 'card'
	$: sideContent = $selected.content?.side ?? 'card'
	$: mainContent = $selected.content?.main ?? 'text'
	$: size = $selected.size ?? ''
	$: container = $selected.container ? `l:${$selected.container} inset` : ''
	$: layout = $selected.layout ? `l:${$selected.layout}` : ''
	$: breakpoint = $selected.breakpoint ? `bp:${$selected.breakpoint}` : ''
	$: contextClasses = `${container} ${layout} ${breakpoint} ${size}`
</script>

<div class={`${contextClasses}`}>
	{#if !isPage}
		{#if title === 'Sidebar'}
			<svelte:component this={component} id={title} {...$selected}>
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
			<svelte:component this={component} id={title} {...$selected}>
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
		<svelte:component this={component} id={title} {...$selected}>
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
		<svelte:component this={component} id={title} {...$selected}>
			{#if content === 'text'}
				{mocks[content]}
			{:else if content === 'card' || content === 'form'}
				{#each mocks[content] as item}
					<div class={`card box ${item} ${size}`}>{item}</div>
				{/each}
			{/if}
		</svelte:component>
	{/if}
</div>
