<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {api} from '@fat-fuzzy/ui'

	const {Element} = api

	let title: string
	let Component: ComponentType

	$: category = $page.data.category
	$: title = $page.data.title
	$: Component = $page.data.Component
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
