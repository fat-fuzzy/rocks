<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {api} from '@fat-fuzzy/ui'

	let {Element} = api

	let title: string
	let Component: ComponentType

	$: category = $page.data.category
	$: categoryItems = $page.data.items
	$: title = $page.params.component
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<Element isPage={true} depth="1" {title} {path} {category} component={Component} />
