<script lang="ts">
	import {onDestroy} from 'svelte'
	import {page} from '$app/stores'

	import type {ComponentType} from 'svelte'
	import {stores, api, tokens, blocks, layouts, compositions, constants} from '$lib'

	const {Element, Api} = api
	const {RevealAuto} = layouts
	const actionPath = '/doc'
	const {DEFAULT_REVEAL_STATE} = constants

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		compositions: compositions,
	}

	let category: string

	let title: string
	let Component: ComponentType

	let stylesApi = api.stylesApi.initStyles()
	let revealContext: {[key: string]: string} = DEFAULT_REVEAL_STATE

	const localStores = [
		stores.ui.styles.subscribe((value) => {
			if (value) {
				stylesApi.applyStyles(value)
			}
		}),
		stores.ui.reveal.subscribe((value) => {
			if (value) {
				revealContext = value
			}
		}),
	]

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: title = $page.params.component
	$: Component = categoryItems[category][title]
	$: path = $page.url.pathname
	$: headerClass = 'page-header card:md l:switcher:md bg:polar'

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={`${title} documentation`} />
</svelte:head>

<header class={headerClass}>
	<h1 class="l:main:30 maki lg">{title}</h1>
	<RevealAuto
		id="ui-component-app-context"
		size="sm"
		breakpoint="md"
		color="primary"
		align="start"
		variant="outline"
		title="Context"
		formaction="toggleContext"
		{actionPath}
		{reveal}
		redirect={$page.url.pathname}
		on:toggle={handleToggle}
	>
		<div slot="content" class="l:side ui:menu l:switcher:sm">
			<Api
				categories={['shared', 'app']}
				{title}
				{path}
				{actionPath}
				redirect={$page.url.pathname}
			/>
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
	{actionPath}
	redirect={$page.url.pathname}
/>
