<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleTree} from './types'

	import {currentStyles} from '$lib/stores/api'

	import {getProps} from '$lib/api/fixtures/js/fixtures-api'

	export let title = ''
	export let isPage = false
	export let component: ComponentType
	export let props: any

	let styles: StyleTree
	let size = '' // element's own size
	let breakpoint = '' // element's own breakpoint
	let background = ''
	let content = ''
	let sideContent = ''
	let mainContent = ''
	let category = 'layouts'

	$: styles = $currentStyles
	// App options
	$: background = styles.app?.settings.contrast ?? background
	// Element options
	$: size = styles.layouts?.element?.size ?? ''
	$: breakpoint = styles.shared?.context.breakpoint ?? breakpoint
	// Content options
	$: content = styles.layouts?.element.content ?? 'card'
	$: sideContent = styles.layouts?.element.side ?? 'card'
	$: mainContent = styles.layouts?.element.main ?? 'text'
</script>

{#if !isPage}
	{@const fixtureProps = getProps({category, component: title})}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {background} {...props}>
			<div slot="side">
				{#each fixtureProps.card as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			</div>
			<div slot="main">
				<p>{fixtureProps.text}</p>
			</div>
		</svelte:component>
	{:else if title === 'Reveal' || title === 'Burrito'}
		<svelte:component this={component} id={title} {size} {background} {breakpoint} {...props}>
			<svelte:fragment slot="content">
				{#each fixtureProps.form as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			</svelte:fragment>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {background} {breakpoint} {...props}>
			{#each fixtureProps.card as item}
				<div class={`card:${size} box ${item} ${size}`}>{item}</div>
			{/each}
		</svelte:component>
	{/if}
{:else if isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {background} {breakpoint} {props}>
			<div slot="side">
				{@const fixtureProps = getProps({category, component: title})}
				{#if sideContent === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if sideContent === 'card' || sideContent === 'form'}
					{#each fixtureProps[sideContent] as item}
						<div class={`card:${size} box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
			<div slot="main">
				{@const fixtureProps = getProps({category, component: title})}
				{#if mainContent === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if mainContent === 'card' || mainContent === 'form'}
					{#each fixtureProps[mainContent] as item}
						<div class={`card:${size} box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
		</svelte:component>
	{:else if title === 'Reveal' || title === 'Burrito'}
		<svelte:component this={component} id={title} {size} {background} {breakpoint} } {props}>
			<div slot="content">
				{@const fixtureProps = getProps({category, component: title})}
				{#if content === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if content === 'card' || content === 'form'}
					{#each fixtureProps[content] as item}
						<div class={`card:${size} box ${item} ${size}`}>{item}</div>
					{/each}
				{/if}
			</div>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {background} {breakpoint} } {props}>
			{@const fixtureProps = getProps({category, component: title})}
			{#if content === 'text'}
				<p>{fixtureProps.text}</p>
			{:else if content === 'card' || content === 'form'}
				{#each fixtureProps[content] as item}
					<div class={`card:${size} box ${item} ${size}`}>{item}</div>
				{/each}
			{/if}
		</svelte:component>
	{/if}
{/if}
