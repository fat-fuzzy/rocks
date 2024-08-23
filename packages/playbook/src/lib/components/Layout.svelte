<script lang="ts">
	import {getContext} from 'svelte'
	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		isPage?: boolean
		SpecifiedElement: any // TODO: fix types
		props: any
		actionPath?: string
		redirect?: string
	}

	let {title, SpecifiedElement, props, actionPath, redirect}: Props = $props()

	let playbookStore: typeof PlaybookStore = getContext('playbookStore')

	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')

	// Content options
	// let content = $derived(styles.layouts?.content.content ?? 'card')
	// let sideContent = $derived(styles.layouts?.content.side ?? 'card')
	// let mainContent = $derived(styles.layouts?.content.main ?? 'text')

	let content = 'card'
	let sideContent = 'card'
	let mainContent = 'text'
	let layoutContent = $derived(`card:${elementStyles.size} variant:outline size:${elementStyles.size} surface:1:accent`)
	let fixtures = $derived(playbookStore.getLayoutFixtures(SpecifiedElement))
</script>

{#snippet children(props, contentType)}
	{#if contentType === 'text'}
			<p class={`card:${elementStyles.size} surface:1:accent`}>{props.text}</p>
	{:else if contentType === 'card'}
		{#each props[content] as item}
			<div class={layoutContent}>{item}</div>
		{/each}
	{/if}
{/snippet}

{#if title === 'Sidebar'}
	<SpecifiedElement id={title}
		{...containerStyles}
		{...layoutStyles}
		{...elementStyles}
		{...props}
	>
		{#snippet side()}
			{@render children(fixtures, sideContent)}
		{/snippet}
		{#snippet main()}
			{@render children(fixtures, mainContent)}
		{/snippet}
	</SpecifiedElement>
{:else}
	<SpecifiedElement
			id={title}
			{...containerStyles}
			{...layoutStyles}
			{...elementStyles}
			{...props}
			{actionPath}
			{redirect}
		>
		{@render children(fixtures, content)}
	</SpecifiedElement>
{/if}
