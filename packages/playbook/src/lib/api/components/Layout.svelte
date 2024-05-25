<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StylesApi} from '$lib/api/components/styles.api'
	import type {StyleTree} from '$lib/api/components/styles.types'

	import {onDestroy, getContext} from 'svelte'

	import * as ui from '$stores/ui'
	import {getFixtures} from '$lib/api/fixtures/js'

	type Props = {
		title: string
		isPage?: boolean
		component: ComponentType
		props: any
	}

	let {title, isPage = false, component, props}: Props = $props()

	let category = 'layouts'

	const stylesApi: StylesApi = getContext('stylesApi')
	let styles: StyleTree = $state(stylesApi.getStyleTree())
	let settings = $state(styles.app)

	const stores = [
		ui.app.subscribe((value) => {
			if (value) {
				settings = {app: value}
			}
		}),
		ui.styles.subscribe((value) => {
			if (value) {
				styles = stylesApi.getStyleTree()
			}
		}),
	]

	// App options
	let background = $derived(settings.app.contrast ?? '')
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

	onDestroy(() => {
		stores.forEach((unsubscribe) => unsubscribe())
	})
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
