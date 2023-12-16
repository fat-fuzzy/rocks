<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import type {ComponentType} from 'svelte'
	import {stores, api, tokens, blocks, layouts, compositions, constants} from '$lib'

	const {Element, Api} = api
	const {RevealAuto} = layouts
	const {ToggleMenu} = compositions
	const actionPath = '/doc'
	const {DEFAULT_REVEAL_STATE, UI_DOC_TABS} = constants

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		compositions: compositions,
	}
	const tabButtons = [
		{
			id: 'context.menu.toggle.demo',
			title: 'Demo',
			size: 'xl',
			color: 'accent',
			asset: 'emoji:demo',
			value: 'demo',
			initial: 'pressed',
		},
		{
			id: 'context.menu.toggle.doc',
			title: 'Doc',
			size: 'xl',
			color: 'primary',
			asset: 'emoji:doc',
			value: 'doc',
		},
	]

	let category: string
	let title: string
	let Component: ComponentType

	let stylesApi = api.stylesApi.initStyles()
	let revealContext: {[key: string]: string} = DEFAULT_REVEAL_STATE
	let currentTab = $page.data.currentTab || UI_DOC_TABS[0]

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
		stores.ui.tab.subscribe((value) => {
			if (value) {
				currentTab = value
			}
		}),
	]

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	function handleTabChange(event: CustomEvent) {
		stores.ui.tab.set(event.detail.selected[0])
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: title = $page.params.component
	$: Component = categoryItems[category][title]
	$: path = $page.url.pathname
	$: markdowns =
		$page.data.markdowns && $page.data.markdowns[category] ? $page.data.markdowns[category] : []
	$: content = markdowns.find(({meta}) => meta.title === title) || {
		html: `<p class="feedback emoji:default">Doc Coming Soon!</p>`,
	}
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
		container="side"
		{actionPath}
		{reveal}
		redirect={$page.url.pathname}
		on:toggle={handleToggle}
	>
		<div slot="content" class="ui:menu l:switcher:sm">
			{#if currentTab.value === 'demo'}
				<Api {title} {path} {actionPath} redirect={$page.url.pathname} />
			{/if}
			<form
				method="POST"
				class="l:switcher:sm"
				action={`/doc?/handleTabChange&redirectTo=${$page.url.pathname}`}
				use:enhance={() => {
					// prevent default callback from resetting the form
					return ({update}) => {
						update({reset: false})
					}
				}}
			>
				<ToggleMenu
					id={`submit.${path}`}
					items={tabButtons}
					layout="switcher"
					size="lg"
					color="primary"
					variant="round outline"
					formaction={`/doc?/handleTabChange&redirectTo=${$page.url.pathname}`}
					on:click={handleTabChange}
				/>
			</form>
		</div>
	</RevealAuto>
</header>

{#if content.html && currentTab.value === 'doc'}
	<article class="l:sidebar:xs">
		<div class="l:main">
			<section class="l:text:lg md">
				{@html content.html}
			</section>
		</div>
		<aside class="l:side">
			{#if content.meta.props_style}
				<details open>
					<summary class={`card:xs bg:primary:light box:primary:light`}>Style Props</summary>
					<ul class="tags l:switcher:md">
						{#each content.meta.props_style as prop}
							<li class="card:sm bg:primary:lightest">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
			{#if content.meta.content_type}
				<details open>
					<summary class={`card:xs bg:primary:light box:primary:light`}>Content Type</summary>
					<ul class="tags l:switcher:md">
						{#each content.meta.content_type as prop}
							<li class="card:sm bg:highlight:lightest">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
			{#if content.meta.props_state}
				<details open>
					<summary class={`card:xs bg:primary:light box:primary:light`}>State Props</summary>
					<ul class="tags l:switcher:md">
						{#each content.meta.props_state as prop}
							<li class="card:sm bg:accent:lightest">{prop}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</aside>
	</article>
{:else if currentTab.value === 'demo'}
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
{/if}
