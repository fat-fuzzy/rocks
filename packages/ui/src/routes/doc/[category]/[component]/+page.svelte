<script lang="ts">
	import {page} from '$app/stores'
	import {onDestroy} from 'svelte'

	import type {ComponentType} from 'svelte'
	import * as uiLib from '$lib'

	let {Element, Api} = uiLib.api
	let {RevealAuto} = uiLib.layouts
	let category: string
	let categoryItems: {[name: string]: ComponentType}

	let title: string
	let Component: ComponentType

	let stylesApi = uiLib.api.stylesApi.initStyles()

	let revealContext: {[key: string]: string} = {reveal: ''}

	const localStores = [
		uiLib.stores.ui.styles.subscribe((value) => {
			if (value) {
				stylesApi.applyStyles(value)
			}
		}),
		uiLib.stores.ui.reveal.subscribe((value) => {
			if (value) {
				revealContext = value
			}
		}),
	]

	function handleToggle(event: CustomEvent) {
		uiLib.stores.ui.reveal.set(event.detail)
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: categoryItems = uiLib[category]
	$: title = $page.params.component
	$: Component = categoryItems[title]
	$: path = $page.url.pathname
	$: headerClass = 'page-header l:switcher:md bg:polar'

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class={headerClass}>
	<h1 class="l:main:30 card:xl">{title}</h1>
	<RevealAuto
		id="ui-component-app-context"
		size="sm"
		breakpoint="sm"
		color="primary"
		align="start"
		variant="outline"
		title="Context"
		formaction="toggleContext"
		actionPath="doc"
		{reveal}
		{path}
		on:toggle={handleToggle}
	>
		<div slot="content" class="l:side ui:menu l:switcher:sm">
			<Api categories={['shared', 'app']} {title} {path} />
		</div>
	</RevealAuto>
</header>

<Element
	isPage={true}
	depth={1}
	{title}
	page={path}
	{path}
	{category}
	{stylesApi}
	component={Component}
/>
