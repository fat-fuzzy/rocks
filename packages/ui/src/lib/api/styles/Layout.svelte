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
	let threshold = '' // element's own threshold
	let background = ''
	let content = ''
	let sideContent = ''
	let mainContent = ''
	let category = 'layouts'

	$: styles = $currentStyles
	// App options
	$: background = styles.app?.settings.contrast ?? background
	// Element options
	$: size = styles.layouts?.element?.size ?? size
	$: threshold = styles.layouts?.element.threshold ?? threshold
	// Content options
	$: content = styles.layouts?.content.content ?? 'card'
	$: sideContent = styles.layouts?.content.side ?? 'card'
	$: mainContent = styles.layouts?.content.main ?? 'text'
	$: contentStyles = `card:${size} box ${size} bg:highlight:lighter`
</script>

{#if isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {background} {threshold} {props}>
			<div slot="side">
				{@const fixtureProps = getProps({category, component: title})}
				{#if sideContent === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if sideContent === 'card' || sideContent === 'form'}
					{#each fixtureProps[sideContent] as item}
						<div class={contentStyles}>{item}</div>
					{/each}
				{/if}
			</div>
			<div slot="main">
				{@const fixtureProps = getProps({category, component: title})}
				{#if mainContent === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if mainContent === 'card' || mainContent === 'form'}
					{#each fixtureProps[mainContent] as item}
						<div class={contentStyles}>{item}</div>
					{/each}
				{/if}
			</div>
		</svelte:component>
	{:else if title === 'Reveal' || title === 'RevealAuto' || title === 'Burrito'}
		<svelte:component this={component} id={title} {size} {background} {threshold} } {props}>
			<div slot="content">
				{@const fixtureProps = getProps({category, component: title})}
				{#if content === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if content === 'card' || content === 'form'}
					{#each fixtureProps[content] as item}
						<div class={contentStyles}>{item}</div>
					{/each}
				{/if}
			</div>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {background} {threshold} } {props}>
			{@const fixtureProps = getProps({category, component: title})}
			{#if content === 'text'}
				<p>{fixtureProps.text}</p>
			{:else if content === 'card' || content === 'form'}
				{#each fixtureProps[content] as item}
					<div class={contentStyles}>{item}</div>
				{/each}
			{/if}
		</svelte:component>
	{/if}
{:else}
	{@const fixtureProps = getProps({category, component: title})}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {background} {threshold} {...props}>
			<div slot="side">
				{#each fixtureProps.card as item}
					<div class={contentStyles}>{item}</div>
				{/each}
			</div>
			<div slot="main">
				<p>{fixtureProps.text}</p>
			</div>
		</svelte:component>
	{:else if title === 'Reveal' || title === 'RevealAuto' || title === 'Burrito'}
		<svelte:component this={component} id={title} {size} {background} {threshold} {...props}>
			<svelte:fragment slot="content">
				{#each fixtureProps.form as item}
					<div class={contentStyles}>{item}</div>
				{/each}
			</svelte:fragment>
		</svelte:component>
	{:else}
		<svelte:component this={component} id={title} {size} {background} {threshold} {...props}>
			{#each fixtureProps.card as item}
				<div class={contentStyles}>{item}</div>
			{/each}
		</svelte:component>
	{/if}
{/if}
