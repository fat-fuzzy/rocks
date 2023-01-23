<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Api from './Api.svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import type {UIProps} from './api-options'

	export let title = ''
	export let component: ComponentType
	export let initial: UIProps
	export let showOptions = false

	// TODO: figure out how I can deduct props from component
	let selected = {...initial}

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
	{#if title}
		<h3>{title}</h3>
	{/if}
	<Sidebar size="xs" placement="end">
		<main slot="main" class={`card plus ${selected.contrast ?? ''}`}>
			{#if component}
				<svelte:component this={component} {...selected} />
			{/if}
		</main>
		<aside slot="side">
			{#if showOptions}
				<Api {selected} component={title} on:changed={setCurrent} />
			{:else}
				<!-- TODO: <a class="font:lg bare" href={`/ui/blocks/${title}`}>View</a> -->
			{/if}
		</aside>
	</Sidebar>
</article>
