<script lang="ts">
	import {getContext} from 'svelte'
	import {PlaybookActor} from '$lib/api/actor.svelte'

	type Props = {
		title: string
		isPage?: boolean
		SpecifiedElement: any // TODO: fix types
		props: any
		formaction?: string
		actionPath?: string
		redirect?: string
	}

	let {
		title,
		SpecifiedElement,
		props,
		formaction,
		actionPath,
		redirect,
	}: Props = $props()

	let actor: PlaybookActor = getContext('playbookActor')

	let styles = $derived(actor.styles)
	let elementStyles = $derived(styles.blocks?.families?.element || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')

	// Content options
	// let content = $derived(styles.layouts?.content.content ?? 'ravioli')
	// let sideContent = $derived(styles.layouts?.content.side ?? 'ravioli')
	// let mainContent = $derived(styles.layouts?.content.main ?? 'text')

	let content = 'ravioli'
	let sideContent = 'ravioli'
	let mainContent = 'text'
	let layoutContent = 'ravioli:md variant:outline size:md surface:1:neutral'
	let fixtures = $derived(actor.getLayoutFixtures(SpecifiedElement))
</script>

{#snippet children(props, contentType: string)}
	{#if contentType === 'text'}
		<p class={`ravioli:md surface:1:neutral`}>
			{props.text}
		</p>
	{:else if contentType === 'ravioli'}
		{#each props[content] as item}
			<div class={layoutContent}>{item}</div>
		{/each}
	{/if}
{/snippet}

{#if title === 'Sidebar'}
	<SpecifiedElement
		id={title}
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
		{formaction}
	>
		{@render children(fixtures, content)}
	</SpecifiedElement>
{/if}
