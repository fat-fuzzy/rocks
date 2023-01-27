<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {ComponentProps} from './options'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import {API_OPTIONS, DEFAULT_OPTIONS} from './options'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let category = 'app'
	export let path = ''
	export let component: ComponentType
	export let initial: ComponentProps = {
		...DEFAULT_OPTIONS[category],
		...DEFAULT_OPTIONS['shared'],
		...DEFAULT_OPTIONS['app'],
	}

	// TODO: figure out how I can deduct props from component
	let updated = {...initial}
	let selected = {...updated}
	const options = {...API_OPTIONS[category], ...API_OPTIONS['shared'], ...API_OPTIONS['app']}

	// TODO: rigure out a way to let user resize component container
	let frame
	let width
	let height

	const updateSelected = (event) => {
		updated = event.detail.items.reduce((values, option) => {
			return {...values, [option.id]: option.value}
		}, {})
	}

	$: app = selected.app ?? ''
	$: brightness = selected.brightness ?? ''
	$: contrast = selected.contrast ?? ''
	$: size = selected.size ?? ''
	$: element = isPage ? 'card:lg layer' : ''
	$: article = !isPage ? 'card:lg l-text' : ''
	$: classes = `${element} ${brightness} ${contrast} ${size}`
	$: selected = {
		...selected,
		...updated,
	}
</script>

<article class={article}>
	{#if !isPage}
		<svelte:element this={`h${String(depth)}`}>{title}</svelte:element>
		<svelte:component this={component} {...selected} />
		<a class="primary" href={`${path}/${title}`}>View {title} API</a>
	{:else}
		<Sidebar size="md" placement="end">
			<main slot="main" class={classes}>
				<svelte:component this={component} {...selected} />
			</main>
			<aside slot="side">
				<Api {title} {options} {selected} on:changed={updateSelected} />
			</aside>
		</Sidebar>
	{/if}
</article>
