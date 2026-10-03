<script lang="ts">
	import type {Component} from 'svelte'
	import {getContext} from 'svelte'
	import {PlaybookActor} from '#lib/api/actor.svelte.js'

	type Props = {
		id?: string
		name?: string
		title: string
		SpecifiedElement: Component // TODO: fix types
		props: object
		formaction?: string
		actionPath?: string
		redirect?: string
	}

	let {
		id,
		name,
		title,
		SpecifiedElement,
		props,
		formaction,
		actionPath,
		redirect,
	}: Props = $props()

	let playbookActor: PlaybookActor = getContext('playbookActor')
	let styles = $derived(playbookActor.styles)

	let blockStyles = $derived(styles.blocks?.families?.block || '')
	let layoutStyles = $derived(styles.layouts?.families?.layout || '')
	let containerStyles = $derived(styles.layouts?.families?.container || '')

	// Content options
	// let content = $derived(styles.layouts?.content.content ?? 'ravioli')
	// let sideContent = $derived(styles.layouts?.content.side ?? 'ravioli')
	// let mainContent = $derived(styles.layouts?.content.main ?? 'text')

	let layoutName = $derived(name ? name : title)
	let content = 'ravioli'
	let sideContent = 'ravioli'
	let mainContent = 'text'
	let layoutContent = 'ravioli:md variant:outline size:md surface:1:neutral'
	let fixtures = $derived(
		playbookActor.getLayoutFixtures(typeof SpecifiedElement),
	)
</script>

{#snippet children(props: {[key: string]: string}, contentType: string)}
	{#if contentType === 'text'}
		<p class="ravioli:md surface:1:neutral">
			{props.text}
		</p>
	{:else if contentType === 'ravioli'}
		{#each props[content] as item, i (i)}
			<div class={layoutContent}>{item}</div>
		{/each}
	{/if}
{/snippet}

{#if title === 'Sidebar'}
	<SpecifiedElement
		id={title}
		{...containerStyles}
		{...layoutStyles}
		{...blockStyles}
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
		{id}
		{title}
		name={layoutName}
		{...containerStyles}
		{...layoutStyles}
		{...blockStyles}
		{...props}
		{actionPath}
		{redirect}
		{formaction}
	>
		{@render children(fixtures, content)}
	</SpecifiedElement>
{/if}
