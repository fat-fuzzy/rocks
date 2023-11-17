<script lang="ts">
	import {page} from '$app/stores'
	import type {ComponentType} from 'svelte'
	import * as ui from '$lib'

	let {Element, Api} = ui.api
	let {RevealAuto} = ui.layouts
	let category: string
	let categoryItems: {[name: string]: ComponentType}

	let title: string
	let Component: ComponentType

	$: category = $page.params.category
	$: categoryItems = ui[category]
	$: title = $page.params.component
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
	$: headerClass = 'page-header l:switcher:md bg:polar'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class={headerClass}>
	<h1 class="l:main:30 card:xl">{title}</h1>
	<RevealAuto
		size="sm"
		threshold="md"
		color="primary:light"
		align="start"
		asset="&nbsp;☂️&nbsp;"
		title="Context"
	>
		<div slot="content" class="l:side ui:menu l:switcher:sm">
			<Api categories={['shared', 'app']} {title} />
		</div>
	</RevealAuto>
</header>

<Element isPage={true} depth={1} {title} page={path} {path} {category} component={Component} />
