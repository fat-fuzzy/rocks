<script lang="ts">
	import type {PageData} from './$types'
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import * as ui from '@fat-fuzzy/ui'

	export let data: PageData

	let {Element} = ui.api
	let category: string
	let categoryItems: {[name: string]: ComponentType}
	let uiState = data.uiState

	let title: string
	let Component: ComponentType

	$: {
		category = $page.params.category
		categoryItems = ui[category]
	}
	$: title = $page.params.component
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
	$: {
		uiState = data.uiState
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<Element
	isPage={true}
	depth="1"
	{title}
	page={path}
	{path}
	{category}
	component={Component}
	{uiState}
/>
