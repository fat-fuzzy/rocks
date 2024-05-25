<script lang="ts">
	import {getContext} from 'svelte'
	import type {StylesApi} from '$lib/api/styles.api'
	import type {StyleTree} from '$lib/api/styles.types'

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

	const stylesApi: StylesApi = getContext('stylesApi')
	const playbookStore: PlaybookStore = getContext('playbookStore')
	let styles: StyleTree = $derived(stylesApi.getStyleTree())
	let settings = $derived(playbookStore.app)

	// App options
	let background = $derived(settings.contrast ?? '')
	// Block options
	let size = $derived(styles.blocks?.element?.size ?? '') // element's own size
	let color = $derived(styles.blocks?.element?.color ?? '')
	let variant = $derived(styles.blocks?.element?.variant ?? '')
	// Layout options
	let breakpoint = $derived(styles.layouts?.layout.breakpoint ?? '') // element's own breakpoint
	let threshold = $derived(styles.layouts?.layout.threshold ?? '') // element's own threshold
	// Content options
	// let content = $derived(styles.layouts?.content.content ?? 'card')
	// let sideContent = $derived(styles.layouts?.content.side ?? 'card')
	// let mainContent = $derived(styles.layouts?.content.main ?? 'text')
	let content = 'card'
	let sideContent = 'card'
	let mainContent = 'text'
	let contentStyles = $derived(`card:${size} box ${size} bg:highlight:lightest`)
</script>

{#if isPage}
	{#if title === 'Sidebar'}
		<svelte:component this={component} id={title} {size} {background} {props}>
			<div slot="side">
				{@const fixtureProps = getFixtures({category, component: title})}
				{#if sideContent === 'text'}
					<p>{fixtureProps.text}</p>
				{:else if sideContent === 'card' || sideContent === 'form'}
					{#each fixtureProps[sideContent] as item}
						<div class={contentStyles}>{item}</div>
					{/each}
				{/if}
			</div>
			<div slot="main">
				{@const fixtureProps = getFixtures({category, component: title})}
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
		<svelte:component
			this={component}
			id={title}
			{color}
			{variant}
			{size}
			{background}
			{breakpoint}
			{props}
		>
			<div slot="content">
				{@const fixtureProps = getFixtures({category, component: title})}
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
		<svelte:component
			this={component}
			id={title}
			{size}
			{background}
			{breakpoint}
			{threshold}
			{props}
		>
			{@const fixtureProps = getFixtures({category, component: title})}
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
	{@const fixtureProps = getFixtures({category, component: title})}
	{#if title === 'Sidebar'}
		<svelte:component
			this={component}
			id={title}
			{size}
			{background}
			{...props}
		>
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
		<svelte:component
			this={component}
			id={title}
			{color}
			{variant}
			{size}
			{background}
			{breakpoint}
			{...props}
		>
			<svelte:fragment slot="content">
				{#each fixtureProps.form as item}
					<div class={contentStyles}>{item}</div>
				{/each}
			</svelte:fragment>
		</svelte:component>
	{:else}
		<svelte:component
			this={component}
			id={title}
			{size}
			{background}
			{breakpoint}
			{threshold}
			{...props}
		>
			{#each fixtureProps.card as item}
				<div class={contentStyles}>{item}</div>
			{/each}
		</svelte:component>
	{/if}
{/if}
