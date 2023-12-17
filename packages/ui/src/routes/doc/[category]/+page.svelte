<script lang="ts">
	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {tokens, blocks, compositions, layouts, api, stores, constants} from '$lib'
	const {Collection, Api} = api
	const {RevealAuto} = layouts
	const {ToggleMenu} = compositions

	const actionPath = '/doc'
	const {DEFAULT_REVEAL_STATE, UI_DOC_TABS} = constants

	let stylesApi = api.stylesApi.initStyles()
	let revealContext: {[key: string]: string} = DEFAULT_REVEAL_STATE

	const tabButtons = [
		{
			id: 'context.menu.toggle.demo',
			title: 'Demo',
			size: 'xl',
			color: 'accent',
			asset: 'emoji:demo',
			value: 'demo',
		},
		{
			id: 'context.menu.toggle.doc',
			title: 'Doc',
			size: 'xl',
			color: 'primary',
			asset: 'emoji:doc',
			value: 'doc',
			initial: 'pressed',
		},
	]

	let currentTab = $page.data.currentTabs?.category || UI_DOC_TABS[0]

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
		stores.ui.categoryTab.subscribe((value) => {
			if (value) {
				currentTab = value
			}
		}),
	]

	function getComponentType(cat: string) {
		switch (cat) {
			case 'tokens':
				return tokens
			case 'blocks':
				return blocks
			case 'layouts':
				return layouts
			case 'compositions':
				return compositions
			default:
				return {}
		}
	}

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	function handleTabChange(event: CustomEvent) {
		stores.ui.categoryTab.set(event.detail.selected[0])
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: title = `${category.charAt(0).toUpperCase()}${category.slice(1)}`
	$: components = getComponentType(category)
	$: path = $page.url.pathname
	$: markdowns = $page.data.markdowns
	$: content = markdowns.categories.find(({meta}) => meta.slug === category)
	$: headerClass = 'page-header card:md l:switcher:xs bp:xxs bg:polar'

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
		id="ui-category-app-context"
		size="sm"
		breakpoint="sm"
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
		<div slot="content" class="ui:menu l:switcher:sm">
			{#if currentTab.value === 'demo'}
				<Api {title} {path} {actionPath} redirect={$page.url.pathname} />
			{/if}
			<form
				method="POST"
				class="l:switcher:sm shrink"
				action={`/doc?/handleElementTabChange&redirectTo=${$page.url.pathname}`}
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
					formaction={`/doc?/handleElementTabChange&redirectTo=${$page.url.pathname}`}
					on:click={handleTabChange}
				/>
			</form>
		</div>
	</RevealAuto>
</header>

{#if content.html && currentTab.value === 'doc'}
	<article class="l:sidebar:xs">
		<section class="l:main card:md">
			<div class="l:text:lg">{@html content.html}</div>
		</section>
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
		</aside>
	</article>
{:else if currentTab.value === 'demo'}
	<Collection
		{title}
		depth={1}
		isPage={true}
		{components}
		{path}
		{category}
		{content}
		{stylesApi}
		{actionPath}
		redirect={$page.url.pathname}
	/>
{/if}
