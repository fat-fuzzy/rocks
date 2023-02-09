<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleFamily} from './options'
	import Sidebar from '../layouts/Sidebar.svelte'
	import Api from './Api.svelte'
	import Block from './Block.svelte'
	import Layout from './Layout.svelte'
	import {API_OPTIONS} from './options'
	import {selectedBlock, selectedLayout} from '../stores/api'

	export let title = ''
	export let depth = 0
	export let isPage = false
	export let category = ''
	export let path = ''
	export let component: ComponentType

	let uiElement = category === 'layouts' ? Layout : Block
	let selected = category === 'layouts' ? $selectedLayout : $selectedBlock

	const getFamilyOptionValue = (styleFamily: StyleFamily, styleOption: string) => {
		// TODO: filter include / exclude in here
		return typeof styleFamily !== 'string' ? styleFamily[styleOption] : ''
	}
	// TODO: improve this code - make it easier to understand ! (use store ?)

	$: options = {...API_OPTIONS[category], ...API_OPTIONS['shared'], ...API_OPTIONS['app']}
	$: theme = selected.settings && getFamilyOptionValue(selected.settings, 'theme')
	$: articleClasses = !isPage ? `l:stack md` : ''
	$: selected = category === 'layouts' ? $selectedLayout : $selectedBlock
	// TODO: figure out a way to let user resize component container
</script>

<article class={articleClasses}>
	{#if !isPage}
		<a class="primary" href={`${path}/${title}`}>
			<svelte:element this={`h${String(depth)}`} class="font:lg">{title} API 🔗</svelte:element>
		</a>
		<svelte:component this={uiElement} {component} />
	{:else}
		<Sidebar size="xs" align="end">
			<main slot="main" class="card:lg inset">
				<svelte:component this={uiElement} {component} />
			</main>
			<aside slot="side">
				<Api {title} {options} {category} />
			</aside>
		</Sidebar>
	{/if}
</article>
