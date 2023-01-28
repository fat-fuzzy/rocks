<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {api} from '@fat-fuzzy/ui'

	let {Element} = api

	let title: string
	let Component: ComponentType

	$: category = $page.data.category
	$: categoryItems = $page.data.items
	$: title = `${$page.params.component.charAt(0).toUpperCase()}${$page.params.component.slice(1)}`
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Element isPage={true} depth="1" {title} {path} {category} component={Component} />
