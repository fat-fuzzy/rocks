<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Api from './Api.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import type {ComponentProps} from './options'
	import {layouts, shared, DEFAULT_OPTIONS} from './options'

	export let title = ''
	export let depth = 3
	export let isPage = false
	export let component: ComponentType
	export let initial: ComponentProps = {...DEFAULT_OPTIONS['shared'], ...DEFAULT_OPTIONS['layouts']}

	// TODO: figure out how I can deduct props from component
	let selected = {...initial}
	const options = {...layouts, ...shared}

	// TODO: rigure out a way to let user resize component container
	let frame
	let width
	let height

	const setCurrent = (event) => {
		const updated = event.detail.items.reduce((values, option) => {
			return {...values, [option.id]: option.value}
		}, {})
		selected = {
			...selected,
			...updated,
		}
	}
</script>

<article class={`card box ${selected.light ?? ''}`}>
	{#if !isPage}
		<svelte:element this={`h${depth}`}>{title}</svelte:element>
	{/if}
	<Sidebar size="xxs" placement="end">
		<main slot="main" class={`card plus ${selected.contrast ?? ''}`}>
			{#if component}
				<svelte:component this={component} {...selected} />
			{/if}
		</main>
		<aside slot="side">
			{#if isPage}
				<Api {selected} component={title} {options} on:changed={setCurrent} />
			{:else}
				<!-- TODO: <a class="font:lg bare" href={`/ui/blocks/${title}`}>View</a> -->
			{/if}
		</aside>
	</Sidebar>
</article>
