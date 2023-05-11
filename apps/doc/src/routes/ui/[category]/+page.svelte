<script lang="ts">
	import type {PageData} from './$types'
	import {page} from '$app/stores'
	import {blocks, compositions, layouts, api} from '@fat-fuzzy/ui'
	const {Collection} = api

	export let data: PageData

	let uiState = data.uiState

	function getComponentType(cat: string) {
		switch (cat) {
			case 'blocks':
				return blocks
			case 'layouts':
				return layouts
			case 'compositions':
				return compositions
			default:
				break
		}
	}

	$: category = $page.params.category
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = getComponentType(category)
	$: path = $page.url.pathname

	$: {
		uiState = data.uiState
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Collection {title} depth="1" isPage={true} {components} {path} {category} {uiState} />
