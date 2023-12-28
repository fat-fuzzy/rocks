<script lang="ts">
	import type {ComponentType} from 'svelte'
	import type {StyleProps} from '$lib/api/props/types'

	import {onDestroy} from 'svelte'
	import {enhance} from '$app/forms'
	import {page} from '$app/stores'

	import {
		stores,
		api,
		tokens,
		blocks,
		layouts,
		recipes,
		graphics,
		constants,
		headless,
		utils,
	} from '$lib'

	const {DEFAULT_REVEAL_STATE, DEFAULT_TABS, TABS} = constants
	const {Head} = headless
	const {Element, Api} = api
	const {RevealAuto} = layouts
	const {ToggleMenu} = recipes
	const actionPath = '/test'
	const tabs = TABS
	let props: StyleProps

	let revealContext = $page.data.dsContext || DEFAULT_REVEAL_STATE
	let currentTab = $page.data.currentTabs?.element || DEFAULT_TABS[0]

	const localStores = [
		stores.ui.reveal.subscribe((value) => {
			if (value) {
				revealContext = value
			}
		}),
		stores.ui.currentTab.subscribe((value) => {
			if (value) {
				currentTab = value
			}
		}),
	]

	let categoryItems: {[name: string]: any} = {
		tokens: tokens,
		blocks: blocks,
		layouts: layouts,
		recipes: recipes,
		graphics: graphics,
	}

	let category: string
	let title: string
	let Component: ComponentType

	function handleToggle(event: CustomEvent) {
		stores.ui.reveal.set(event.detail)
	}

	function handleTabChange(event: CustomEvent) {
		stores.ui.currentTab.set(event.detail.selected[0])
	}

	$: reveal = revealContext.reveal
	$: category = $page.params.category
	$: title = $page.params.component
	$: Component = categoryItems[category][title]
	$: path = $page.url.pathname
	$: markdowns =
		$page.data.markdowns && $page.data.markdowns[category] ? $page.data.markdowns[category] : []
	$: content = markdowns.find(({meta}) => meta.title === title) || {
		html: `<p class="feedback bare emoji:default">Doc Coming Soon!</p>`,
	}
	$: headerClass = 'page-header l:switcher:md bg:polar'
	$: props = utils.props.getElementProps(content.meta)

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Head {title} page="Test" description={`${title} Test Page`} />

<header class={headerClass}>
	<h1 class="l:main:30 maki lg">{title}</h1>
	<RevealAuto
		id="ui-component-app-context"
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
				<Api {path} {actionPath} redirect={$page.url.pathname} />
			{/if}
			<form
				method="POST"
				class="l:switcher:sm shrink align:center"
				action={`/test?/updateTab&redirectTo=${$page.url.pathname}`}
				use:enhance={() => {
					// prevent default callback from resetting the form
					return ({update}) => {
						update({reset: false})
					}
				}}
			>
				<ToggleMenu
					id={`submit.${path}`}
					items={tabs.map((tab) => {
						if (tab.value == currentTab.value) {
							tab.initial = 'pressed'
						}
						return tab
					})}
					layout="switcher"
					size="md"
					container="card:md"
					color="primary"
					variant="outline"
					shape="round"
					formaction={`/test?/updateTab&redirectTo=${$page.url.pathname}`}
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
			{#if !content.meta}
				<p class="feedback bare emoji:default">Coming Soon!</p>
			{:else}
				{#if content.meta.props_style}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}>Style Props</summary>
						<ul class="tags l:switcher:md">
							{#if props.doc}
								{#each props.doc as docs}
									{#if docs.tokens}
										{#each docs.tokens as prop}
											<li class="card:sm bg:primary:lightest">{prop}</li>
										{/each}
									{/if}
									{#if docs.blocks}
										{#each docs.blocks as prop}
											<li class="card:sm bg:primary:lightest">{prop}</li>
										{/each}
									{/if}
									{#if docs.layouts}
										{#each docs.layouts as prop}
											<li class="card:sm bg:primary:lightest">{prop}</li>
										{/each}
									{/if}
								{/each}
							{/if}
						</ul>
					</details>
				{/if}
				{#if content.meta.content_type}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}>Content Type</summary>
						<ul class="tags l:switcher:md">
							{#each content.meta.content_type as prop}
								<li class="card:sm bg:highlight:lightest">{prop}</li>
							{/each}
						</ul>
					</details>
				{/if}
				{#if content.meta.props_state}
					<details open>
						<summary class={`bg:primary:light box:primary:light`}>State Props</summary>
						<ul class="tags l:switcher:md">
							{#each content.meta.props_state as prop}
								<li class="card:sm bg:accent:lightest">{prop}</li>
							{/each}
						</ul>
					</details>
				{/if}
			{/if}
		</aside>
	</article>
{:else if currentTab.value === 'demo'}
	<Element
		isPage={true}
		depth={1}
		{title}
		{path}
		{category}
		component={Component}
		meta={content.meta}
		{actionPath}
		redirect={$page.url.pathname}
	/>
{/if}
