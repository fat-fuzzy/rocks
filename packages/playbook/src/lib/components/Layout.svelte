<script lang="ts">
	import {getContext} from 'svelte'

	import PlaybookStore from '$lib/api/store.svelte'
	import {getFixtures} from '$lib/fixtures/js'

	type Props = {
		title: string
		isPage?: boolean
		component: any // TODO: fix types
		props: any
	}

	let {title, isPage = false, component, props}: Props = $props()

	let category = 'layouts'

	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let layoutStyles = $derived(styles.layouts.layout)

	let settings = $derived(playbookStore.app)

	// App options
	let background = $derived(settings.contrast ?? '')
	// Block options
	let size = $derived(elementStyles.size ?? '') // element's own size
	let color = $derived(elementStyles.color ?? '')
	let variant = $derived(elementStyles.variant ?? '')
	// Layout options
	let breakpoint = $derived(layoutStyles.breakpoint ?? '') // element's own breakpoint
	let threshold = $derived(layoutStyles.threshold ?? '') // element's own threshold
	// Content options
	// let content = $derived(styles.layouts?.content.content ?? 'card')
	// let sideContent = $derived(styles.layouts?.content.side ?? 'card')
	// let mainContent = $derived(styles.layouts?.content.main ?? 'text')
	let content = 'card'
	let sideContent = 'card'
	let mainContent = 'text'
	let contentStyles = $derived(`card:${size} variant:outline size:${size} bg:highlight:000`)
	let fixtures = $derived(getFixtures({category, component: title}))
</script>

{#snippet children(props, contentType)}
	{#if contentType === 'text'}
			<p>{props.text}</p>
	{:else if contentType === 'card' || contentType === 'form'}
		{#each props[content] as item}
			<div class={contentStyles}>{item}</div>
		{/each}
	{/if}
{/snippet}

{#if isPage}
	{#if title === 'Sidebar'}
		<svelte:component
			this={component}
			id={title} {size}
			{...props}
			{background}
		>
			{#snippet side()}
				{@render children(fixtures, sideContent)}
			{/snippet}

			{#snippet main()}
				{@render children(fixtures, mainContent)}
			{/snippet}
		</svelte:component>
	{:else if title === 'Reveal' || title === 'RevealAuto' || title === 'Burrito'}
		<svelte:component
			this={component}
			id={title}
			{...props}
			{color}
			{variant}
			{size}
			{background}
			{breakpoint}
		>
			{@render children(fixtures, content)}
		</svelte:component>
	{:else}
		<svelte:component
			this={component}
			id={title}
			{...props}
			{size}
			{background}
			{breakpoint}
			{threshold}
			>
			{@render children(fixtures, content)}
		</svelte:component>
	{/if}
{:else}
	{#if title === 'Sidebar'}
		<svelte:component
			this={component}
			id={title}
			{...props}
			{size}
			{background}
		>
			{#snippet side()}
				{@render children(fixtures, sideContent)}
			{/snippet}
			{#snippet main()}
				{@render children(fixtures, mainContent)}
			{/snippet}
		</svelte:component>
	{:else if title === 'Reveal' || title === 'RevealAuto' || title === 'Burrito'}
		<svelte:component
			this={component}
			id={title}
			{...props}
			{color}
			{variant}
			{size}
			{background}
			{breakpoint}
		>
			{@render children(fixtures, content)}
		</svelte:component>
	{:else}
		<svelte:component
			this={component}
			id={title}
			{...props}
			{size}
			{background}
			{breakpoint}
			{threshold}
			>
			{@render children(fixtures, content)}
		</svelte:component>
	{/if}
{/if}
