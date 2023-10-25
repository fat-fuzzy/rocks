<script lang="ts">
	import type {PageData} from './$types'
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import * as ui from '@fat-fuzzy/ui'

	let {Element} = ui.api
	let category: string
	let categoryItems: {[name: string]: ComponentType}

	let title: string
	let Component: ComponentType

	$: {
		category = $page.params.category
		categoryItems = ui[category]
	}
	$: title = $page.params.component
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="card:xl">
	<h1>{title}</h1>
</header>

<Element isPage={true} depth={1} {title} page={path} {path} {category} component={Component} />
