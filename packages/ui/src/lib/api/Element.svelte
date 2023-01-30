<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleFamily} from './options'
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

	const updateSelected = async (event) => {
		updated = await event.detail.items.reduce(async (values, option) => {
			if (event.detail.name.toLowerCase() === 'theme') {
				// TODO : figure out if it is possible to do a dynamic import of app theme
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

	const getFamilyOptionValue = (styleFamily: StyleFamily, styleOption: string) => {
		// TODO: filter include / exclude in here
		return typeof styleFamily !== 'string' ? styleFamily[styleOption] : ''
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: options = {...API_OPTIONS[category], ...API_OPTIONS['shared'], ...API_OPTIONS['app']}
	$: initial = {
		...DEFAULT_OPTIONS[category],
		...DEFAULT_OPTIONS['shared'],
		...DEFAULT_OPTIONS['app'],
	}
	$: theme = selected.settings && getFamilyOptionValue(selected.settings, 'theme')
	$: brightness = selected.settings && getFamilyOptionValue(selected.settings, 'brightness')
	$: contrast = selected.settings && getFamilyOptionValue(selected.settings, 'contrast')
	$: content = selected.content && getFamilyOptionValue(selected.content, 'content')
	$: sideContent = selected.content && getFamilyOptionValue(selected.content, 'side')
	$: mainContent = selected.content && getFamilyOptionValue(selected.content, 'main')
	$: size = selected.context && getFamilyOptionValue(selected.context, 'size')
	$: container = selected.context && getFamilyOptionValue(selected.context, 'container')
	$: element = isPage ? `card:lg inset` : '' // TODO: fix container usage (container sidebar, in blocks)
	$: articleClasses = !isPage ? `card:lg box l:stack` : ''
	$: contextClasses = `ui-element ${element} ${brightness} ${contrast} ${size} l:${container}`
	$: selected = {...initial, ...updated}
	$: selectedProps = Object.keys(selected).reduce(
		(props, family) => ({...props, ...selected[family]}),
		{},
	)
</script>

<article class={articleClasses}>
	{#if !isPage}
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:lg">{title} API 🔗</svelte:element>
		</a>
		{#if category === 'layouts'}
			<svelte:component this={component} {...selectedProps}>
				{#if content === 'text'}
					{fixtures[content]}
				{:else if content === 'card' || content === 'form'}
					{#each fixtures[content] as item}
						<div class={`card box ${item}`}>{item}</div>
					{/each}
				{/if}
			</svelte:component>
		{:else}
			<svelte:component this={component} {...selectedProps} />
		{/if}
	{:else}
		<Sidebar size="xs" align="end">
			<svelte:fragment slot="main">
				{#if category === 'layouts'}
					<main class={contextClasses}>
						{#if title === 'Sidebar'}
							<svelte:component this={component} {...selectedProps}>
								<div slot="side">
									{#if sideContent === 'text'}
										{fixtures[sideContent]}
									{:else if sideContent === 'card' || sideContent === 'form'}
										{#each fixtures[sideContent] as item}
											<div class={`card box ${item}`}>{item}</div>
										{/each}
									{/if}
								</div>
								<div slot="main">
									{#if mainContent === 'text'}
										{fixtures[mainContent]}
									{:else if mainContent === 'card' || mainContent === 'form'}
										{#each fixtures[mainContent] as item}
											<div class={`card box ${item}`}>{item}</div>
										{/each}
									{/if}
								</div>
							</svelte:component>
						{:else}
							<svelte:component this={component} {...selectedProps}>
								{#if content === 'text'}
									{fixtures[content]}
								{:else if content === 'card' || content === 'form'}
									{#each fixtures[content] as item}
										<div class={`card box ${item}`}>{item}</div>
									{/each}
								{/if}
							</svelte:component>
						{/if}
					</main>
				{:else}
					<main class={contextClasses}>
						<svelte:component this={component} {...selectedProps} />
					</main>
				{/if}
			</svelte:fragment>
			<aside slot="side">
				<Api {title} {options} {selected} {category} on:changed={updateSelected} />
			</aside>
		</Sidebar>
	{/if}
</article>
