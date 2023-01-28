<script lang="ts">
	import type {ComponentType} from 'svelte'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import {API_OPTIONS, DEFAULT_OPTIONS} from './options'
	import fixtures from '../../data/fixtures'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let category = ''
	export let path = ''
	export let component: ComponentType

	// TODO: figure out how I can deduct props from component
	let selected = {
		...DEFAULT_OPTIONS[category],
		...DEFAULT_OPTIONS['shared'],
		...DEFAULT_OPTIONS['app'],
	}
	let updated = selected

	// TODO: figure out a way to let user resize component container
	let frame
	let width
	let height

	const updateSelected = (event) => {
		updated = event.detail.items.reduce((values, option) => {
			if (event.detail.name.toLowerCase() === option.id) {
				return {...values, [option.id]: option.value}
			}
			return {
				...values,
				[event.detail.name.toLowerCase()]: {
					...values[event.detail.name.toLowerCase()],
					[option.id]: option.value,
				},
			}
		}, updated)
	}

	// TODO: improve this code - make it easier to understand !

	$: options = {...API_OPTIONS[category], ...API_OPTIONS['shared'], ...API_OPTIONS['app']}
	$: initial = {
		...DEFAULT_OPTIONS[category],
		...DEFAULT_OPTIONS['shared'],
		...DEFAULT_OPTIONS['app'],
	}
	$: app = selected.app ?? ''
	$: brightness =
		selected.settings && typeof selected.settings !== 'string' ? selected.settings.brightness : ''
	$: contrast =
		selected.settings && typeof selected.settings !== 'string' ? selected.settings.contrast : ''
	$: size = selected.size ?? ''
	$: container =
		selected.context && typeof selected.context !== 'string' ? selected.context.container : ''
	$: content =
		selected.context && typeof selected.context !== 'string' ? selected.context.content : ''
	$: breakpoint = selected.breakpoint ?? ''
	$: element = isPage ? `card:lg inset half l-${container}` : ''
	$: articleClasses = !isPage ? `card:lg box l-stack` : ''
	$: elementClasses = `ui-element ${element} ${brightness} ${contrast} ${size}`
	$: selected = {...initial, ...updated}
</script>

<article class={articleClasses}>
	{#if !isPage}
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:lg">{title} API 🔗</svelte:element>
		</a>
		{#if category === 'layouts'}
			<svelte:component this={component} {...selected}>
				{#if content === 'text'}
					{fixtures[content]}
				{:else if content === 'card' || content === 'form'}
					{#each fixtures[content] as item}
						<div class={`card box ${item}`}>{item}</div>
					{/each}
				{/if}
			</svelte:component>
		{:else}
			<svelte:component this={component} {...selected} />
		{/if}
	{:else}
		<Sidebar size="sm" placement="end">
			<main slot="main" class={elementClasses}>
				{#if category === 'layouts'}
					<svelte:component this={component} {...selected}>
						{#if content === 'text'}
							{fixtures[content]}
						{:else if content === 'card' || content === 'form'}
							{#each fixtures[content] as item}
								<div class={`card box ${item}`}>{item}</div>
							{/each}
						{/if}
					</svelte:component>
				{:else}
					<svelte:component this={component} {...selected} />
				{/if}
			</main>
			<aside slot="side">
				<Api {title} {options} {selected} on:changed={updateSelected} />
			</aside>
		</Sidebar>
	{/if}
</article>
