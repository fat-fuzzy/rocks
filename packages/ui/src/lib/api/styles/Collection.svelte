<script lang="ts">
	import type {ComponentType} from 'svelte'

	import {page} from '$app/stores'
	import {currentStyles} from '$lib/stores/api'
	import Sidebar from '$lib/components/layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Element from './Element.svelte'

	import mocks from '$lib/data/mocks' // TODO: load text from README.md
	import {getProps} from '$lib/api/fixtures/js/fixtures-api'

	export let title = ''
	export let depth = 0
	export let path = ''
	export let layout = 'grid' // TODO: expose breakpoint too
	export let size = 'sm' // TODO: expose breakpoint too
	export let color = 'primary:light' // TODO: expose breakpoint too
	export let isPage = false
	export let components: {[name: string]: ComponentType}
	export let category = $page.params.category || 'shared'

	let styles = $currentStyles

	let brightness = ''
	let contrast = ''
	let contextClasses = ''

	let sharedOptions = {
		container: '',
		size: '',
	}
	// TODO: color code sections
	// TODO; tokens section
	// TODO: composition section
	// TODO: feedback colors & component

	$: styles = $currentStyles

	//== App settings (user controlled)
	$: brightness = styles.app?.settings.brightness ?? brightness
	$: contrast = styles.app?.settings.contrast ?? contrast
	//== Shared settings (user controlled)
	// Container options
	// - [container + size] work together
	$: sharedOptions.container = styles.shared?.container.container ?? sharedOptions.container
	$: sharedOptions.size = styles.shared?.container.size ?? sharedOptions.size

	$: componentNames = Object.keys(components)
	$: titleDepth = Number(depth) + 1
	$: categorySingular = `${category.slice(0, 1).toUpperCase()}${category.slice(
		1,
		category.length - 1,
	)}`
	$: layoutClass = category === 'tokens' ? `l:stack:${size}` : `l:${layout}:${size}`
	$: contextClasses = `${sharedOptions.size}`
</script>

{#if isPage}
	<Sidebar size="xs" align="end">
		<div slot="main" class={layoutClass}>
			{#each componentNames as name}
				{@const component = components[name]}
				{@const props = getProps({category, component: name})}
				<div class={contextClasses}>
					<Element
						title={name}
						depth={Number(depth) + 1}
						page={$page.url.pathname}
						{path}
						{category}
						{component}
						{props}
					/>
				</div>
			{/each}
		</div>
		<aside slot="side">
			<div class="l:text:xl">
				{@html mocks['doc'][category]}
			</div>
			<Api {category} {title} />
		</aside>
	</Sidebar>
{:else}
	<svelte:element this={`h${String(titleDepth)}`} class="font:lg">
		{category}
	</svelte:element>

	<div class="l:text:xl">
		{@html mocks['doc'][category]}
	</div>

	<details class={`l:stack:xxl ${size}`}>
		<summary class={`card:md box:${color} bg:${color}`}>
			{categorySingular} components
		</summary>
		<div class="drop">
			<div class={`${layoutClass} ${contextClasses}`}>
				{#each componentNames as name}
					{@const component = components[name]}
					{@const props = getProps({category, component: name})}
					<Element title={name} depth={Number(depth) + 2} {path} {category} {component} {props} />
				{/each}
			</div>
		</div>
	</details>
{/if}
