<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import {api} from '@fat-fuzzy/ui'

	let title: string
	let Component: ComponentType

	$: category = $page.data.category
	$: title = $page.data.title
	$: Component = $page.data.Component
	$: Api = category === 'blocks' ? api.Block : api.Layout // TODO: try dynamic import
</script>

<header class="header-page">
	<h1>{title}</h1>
</header>

<svelte:component this={Api} showOptions={true} component={Component} />
