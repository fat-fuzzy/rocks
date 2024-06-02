<script lang="ts">
	import {getContext} from 'svelte'

	import PlaybookStore from '$lib/api/store.svelte'

	type Props = {
		title: string
		isPage?: boolean
		component: any // TODO: fix types
		props: any
	}

	let {title, component, props}: Props = $props()
	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles = $derived(playbookStore.styles)
	let elementStyles = $derived(styles.blocks.element)
	let layoutStyles = $derived(styles.layouts.layout)
	let containerStyles = $derived(styles.layouts.container)
	// let contentStyles = $derived(styles.layouts.content) // TODO : Fix this
	let settings = $derived(playbookStore.app)

	// Content options
	// let content = $derived(styles.layouts?.content.content ?? 'card')
	// let sideContent = $derived(styles.layouts?.content.side ?? 'card')
	// let mainContent = $derived(styles.layouts?.content.main ?? 'text')

	let layoutProps = $derived({
		...props,
		// App settings (user controlled)
		...settings,
		// Block style options
		...elementStyles,
		// Layout style options
		...layoutStyles,
	})

	let content = 'card'
	let sideContent = 'card'
	let mainContent = 'text'
	let layoutContent = $derived(`card:${layoutProps.size} variant:outline size:${layoutProps.size} bg:highlight:000`)
	let fixtures = $derived(playbookStore.getLayoutFixtures())// TODO : fix here: get fixtures for collection
</script>

{#snippet children(props, contentType)}
	{#if contentType === 'text'}
			<p>{props.text}</p>
	{:else if contentType === 'card'}
		{#each props[content] as item}
			<div class={layoutContent}>{item}</div>
		{/each}
	{/if}
{/snippet}

{#snippet sidebar()}
	<svelte:component this={component} id={title} {...layoutProps}>
		{#snippet side()}
			{@render children(fixtures, sideContent)}
		{/snippet}
		{#snippet main()}
			{@render children(fixtures, mainContent)}
		{/snippet}
	</svelte:component>
{/snippet}

{#snippet columnLayout()}
	<svelte:component
		this={component}
		id={title}
		{...layoutProps}
	>
		{@render children(fixtures, content)}
	</svelte:component>
{/snippet}

{#key layoutProps}
	{#if containerStyles.container}
		<div class={`l:${containerStyles.container}:${containerStyles.size}`}>
			{#if title === 'Sidebar'}
				{@render sidebar()}
			{:else}
				{@render columnLayout()}
			{/if}
		</div>
	{:else}
		{#if title === 'Sidebar'}
			{@render sidebar()}
		{:else}
			{@render columnLayout()}
		{/if}
	{/if}
{/key}
