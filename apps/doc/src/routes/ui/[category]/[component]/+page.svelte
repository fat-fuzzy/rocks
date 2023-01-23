<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {api} from '@fat-fuzzy/ui'
	const {Block} = api

	let title: string
	let Component: ComponentType

	let initial = $page.data.components.initial

	$: title = $page.data.title
	$: slug = $page.data.slug
	$: Component = $page.data.Component
</script>

<header class="header-page">
	<h1>{title}</h1>
</header>

<Block {slug} showOptions={true} component={Component} {initial} />
