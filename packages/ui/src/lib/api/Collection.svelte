<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {ComponentProps} from './options'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'
	import {API_OPTIONS, DEFAULT_OPTIONS} from './options'

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'stack'
	export let isPage = true
	export let components: ComponentType[]
	export let category = ''
	export let initial: ComponentProps = {
		...DEFAULT_OPTIONS['app'],
	}
	// TODO: figure out how I can deduct props from component
	let updated = {...initial}
	let selected = {...updated}

	// TODO: figure out a way to let user resize component container
	const updateSelected = (event) => {
		updated = event.detail.items.reduce((values, option) => {
			return {...values, [option.id]: option.value}
		}, {})
	}

	$: options = {...API_OPTIONS['app']}
	$: componentNames = Object.keys(components)
	$: app = selected.app ?? ''
	$: selected = {
		...selected,
		...updated,
	}
	$: classes = `${selected.size || 'lg'} ${selected.brightness ?? ''} ${selected.contrast ?? ''}`
</script>

<article>
	<Sidebar size="sm" placement="end">
		<main slot="main" class={`l-${layout} ${classes}`}>
			{#each componentNames as name}
				{@const Component = components[name]}
				<Element title={name} {category} depth={Number(depth) + 1} {path} component={Component} />
			{/each}
		</main>
		<aside slot="side">
			<Api {title} {options} {selected} on:changed={updateSelected} />
		</aside>
	</Sidebar>
</article>
