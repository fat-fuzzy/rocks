<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import * as ui from '@fat-fuzzy/ui'

	let {Element, Api} = ui.api
	let category: string
	let categoryItems: {[name: string]: ComponentType}

	let title: string
	let Component: ComponentType

	$: category = $page.params.category
	$: categoryItems = ui[category]
	$: title = $page.params.component
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="bg:polar l:sidebar:xxl page-header">
	<h1 class="l:side card:xl">{title}</h1>
	<div class="l:main:half l:switcher card:sm align:end">
		<Api category="shared" {title} />
		<Api category="app" {title} />
	</div>
</header>

<Element isPage={true} depth={1} {title} page={path} {path} {category} component={Component} />
